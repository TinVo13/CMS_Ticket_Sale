import React from 'react'
import { Badge, Button, Checkbox, Col, ConfigProvider, DatePicker, Form, Input, Layout, Modal, Popover, Radio, Row, Space, Table, Tag, Typography } from 'antd';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { ticketFamilyPackageCollection, updateDateTicket, updateStatusTicket } from '../../firebase/controller';
import { TicketFamilyPackage } from '../../types/type';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import ChangeDateModal from '../Model/ChangeDateModal';

interface Filter {
    tuNgay: string,
    denNgay: string,
    tinhTrangSuDung: string,
    congCheckIn: CheckboxValueType[]
}
const { Text } = Typography;
const dateFormat = 'YYYY/MM/DD';

const FamilyTicket: React.FC = () => {
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [changeDateModalOpen, setChangeDateModalOpen] = React.useState<boolean>(false);
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [ticketFamilyPackage, setTicketFamilyPackage] = React.useState<TicketFamilyPackage[]>();

    const [filter, setFilter] = React.useState<Filter>({
        tuNgay: '01/01/2001',
        denNgay: dayjs().format('YYYY/MM/DD').toString(),
        tinhTrangSuDung: 'Tất cả',
        congCheckIn: ['Tất cả']
    });

    const handleFinish = (fieldValues: any) => {
        const values = {
            ...fieldValues,
            'tuNgay': fieldValues['tuNgay'].format('YYYY/MM/DD'),
            'denNgay': fieldValues['denNgay'].format('YYYY/MM/DD'),
            'tinhTrangSuDung': fieldValues['tinhTrangSuDung'],
            'congCheckIn': fieldValues['congCheckIn']
        }
        setFilter(values);
        setModalOpen(false);
    }

    const handleDownloadCSV = () => {
        const downloadExcel = () => {
            const workSheet = XLSX.utils.json_to_sheet(ticketFamilyPackage!);
            const workBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workBook, workSheet, "Báo Cáo");
            //Buffer
            let buf = XLSX.write(workBook, {
                bookType: "xlsx",
                type: "buffer",
            });
            //Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
            //Download
            XLSX.writeFile(workBook, "QuanLyGoiGiaDinh.xlsx");
        };
        downloadExcel();
    }
    const handleChangeDate = (key: string, hanSuDung: string) => {
        updateDateTicket(key, hanSuDung);
        setChangeDateModalOpen(false);
    }
    const handleUpdateStatus = (key: string) => {
        updateStatusTicket(key);
    }
    React.useEffect(() => {
        onSnapshot(ticketFamilyPackageCollection, (snapshot: QuerySnapshot<DocumentData>) => {
            setTicketFamilyPackage(
                snapshot.docs.map((doc) => {
                    return {
                        key: doc.id,
                        ...doc.data()
                    }
                })
            )
        })
    }, [])
    const columns: ColumnsType<TicketFamilyPackage> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render(value, record, index) {
                return index + 1
            },
        },
        {
            title: 'Booking Code',
            dataIndex: 'bookingCode',
            key: 'bookingCode',
        },
        {
            title: 'Số vé',
            dataIndex: 'soVe',
            key: 'soVe',
            filteredValue: [searchValue],
            onFilter(value: any, record) {
                return String(record.soVe).toLowerCase().includes(value)
            },
        },
        {
            title: 'Tình trạng sử dụng',
            dataIndex: 'tinhTrangSuDung',
            key: 'tinhTrangSuDung',
            render: (_, record) => (
                <Space>
                    {record.tinhTrangSuDung.includes("Đã sử dụng") && <Tag color='default'><Badge status='default' text={record.tinhTrangSuDung} style={{ color: '#919DBA' }} /></Tag>}
                    {record.tinhTrangSuDung.includes('Chưa sử dụng') && <Tag color='success' bordered><Badge status='success' text={record.tinhTrangSuDung} style={{ color: '#03AC00' }} /></Tag>}
                    {record.tinhTrangSuDung.includes('Hết hạn') && <Tag color='error' bordered><Badge status='error' text={record.tinhTrangSuDung} style={{ color: 'red' }} /></Tag>}
                </Space>
            ),
            filteredValue: [filter.tinhTrangSuDung],
            onFilter: (value: any, record) => {
                if (value === 'Tất cả') {
                    return record.tinhTrangSuDung;
                } else {
                    return record.tinhTrangSuDung.includes(value)
                }
            }
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'ngaySuDung',
            key: 'ngaySuDung',
            filteredValue: [filter.tuNgay],
            onFilter: (value: any, record) => {
                var ngaySuDung = new Date(record.ngaySuDung?.toString()!);
                var tuNgay = new Date(value.toString());
                var denNgay = new Date(filter.denNgay.toString());
                return tuNgay.valueOf() <= ngaySuDung.valueOf() && ngaySuDung.valueOf() <= denNgay.valueOf();
            }
        },
        {
            title: 'Ngày xuất vé',
            dataIndex: 'ngayXuatVe',
            key: 'ngayXuatVe',
        },
        {
            title: 'Cổng check - in',
            dataIndex: 'congCheckIn',
            key: 'congCheckIn',
            filteredValue: ['Tất cả'],
            onFilter: (value: string | number | boolean, record) => {
                if (filter.congCheckIn.find((values) => values.valueOf() === value)) {
                    return record.congCheckIn;
                }
                return record.congCheckIn.includes(filter.congCheckIn.map((values) => values.toString()));
            }
        },
        {
            dataIndex: 'options',
            key: 'options',
            render: (_, record) => (
                <Space>
                    <Popover content={(
                        <Space direction='vertical'>
                            <Button type='ghost' onClick={() => handleUpdateStatus(record.key!)}>
                                <Text strong>
                                    Sử dụng vé
                                </Text>
                            </Button>
                            <Button type='ghost' onClick={() => setChangeDateModalOpen(true)}>
                                <Text strong>
                                    Đổi ngày sử dụng
                                </Text>
                            </Button>
                            <ChangeDateModal
                                visible={changeDateModalOpen}
                                type='Family'
                                onCancel={() => setChangeDateModalOpen(false)}
                                onClose={() => setChangeDateModalOpen(false)}
                                data={record}
                                handleChangeDate={(key, hanSuDung) => handleChangeDate(key, hanSuDung)} />
                        </Space>
                    )} trigger={'hover'} color='#FFD2A8' placement='topRight'>
                        <MoreOutlined />
                    </Popover>
                </Space>
            )
        }
    ]

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FF993C',
                },
                components: {
                    Button: {
                        colorBorder: '#FF993C',
                        colorText: '#FF993C'
                    },
                    Input: {
                        colorBgContainer: '#F7F7F8'
                    },
                }
            }}>
            <Layout style={{ minHeight: '100%' }}>
                <Space direction='vertical'>
                    <Row justify={'space-between'}>
                        <Col span={9}>
                            <Input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                                placeholder='Tìm bằng số vé'
                                suffix={<SearchOutlined />} />
                        </Col>
                        <Col>
                            <Space>
                                <Button style={{ fontWeight: 'bold' }} onClick={() => setModalOpen(true)}>
                                    Lọc vé
                                </Button>
                                <Button style={{ fontWeight: 'bold' }} onClick={() => handleDownloadCSV()}>
                                    Xuất file (.CSV)
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                    <Table
                        pagination={{ pageSize: 7, position: ['bottomCenter'] }}
                        size='middle'
                        columns={columns}
                        dataSource={ticketFamilyPackage}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} />
                </Space>
                <Modal
                    title={(
                        <Row justify={'center'}>
                            <Text style={{ fontSize: 24, color: 'black' }} strong>Lọc vé</Text>
                        </Row>
                    )}
                    centered
                    open={modalOpen}
                    footer={false}
                    closable={false}
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                >
                    <Form
                        initialValues={{
                            tuNgay: dayjs('2020/01/01', dateFormat),
                            denNgay: dayjs(),
                            tinhTrangSuDung: 'Tất cả',
                            congCheckIn: ['Tất cả']
                        }}
                        onFinish={handleFinish}>
                        <Row>
                            <Col md={12}>
                                <div>
                                    <Text>Từ ngày</Text>
                                    <Form.Item
                                        name={'tuNgay'}>
                                        <DatePicker
                                            format={'YYYY/MM/DD'}
                                        // onChange={(date, dateString) => { setFilter({ ...filter, tuNgay: dateString }) }} 
                                        />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <Text>Đến ngày</Text>
                                    <Form.Item
                                        name={'denNgay'}>
                                        <DatePicker
                                            format={"YYYY/MM/DD"}
                                        // onChange={(date, dateString) => setFilter({ ...filter, denNgay: dateString })} 
                                        />
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Text>Tình trạng sử dụng</Text>
                        <Form.Item
                            name={'tinhTrangSuDung'}>
                            <Radio.Group>
                                <Radio value={'Tất cả'}>Tất cả</Radio>
                                <Radio value={'Đã sử dụng'}>Đã sử dụng</Radio>
                                <Radio value={'Chưa sử dụng'}>Chưa sử dụng</Radio>
                                <Radio value={'Hết hạn'}>Hết hạn</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Text>Cổng Check - in</Text>
                        <Form.Item
                            name={'congCheckIn'}>
                            <Checkbox.Group>
                                <Row justify={'space-between'}>
                                    <Col span={8}>
                                        <Checkbox value="Tất cả" onChange={(e: CheckboxChangeEvent) => {
                                            e.target.checked ? setDisabled(true) : setDisabled(false)
                                        }}>Tất cả</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Cổng 1" disabled={disabled}>Cổng 1</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Cổng 2" disabled={disabled}>Cổng 2</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Cổng 3" disabled={disabled}>Cổng 3</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Cổng 4" disabled={disabled}>Cổng 4</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="Cổng 5" disabled={disabled}>Cổng 5</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                        <Row justify={'center'}>
                            <Button htmlType='submit'>Lọc</Button>
                        </Row>
                        {/* </Space> */}
                    </Form>
                </Modal>
            </Layout>
        </ConfigProvider>
    )
}

export default FamilyTicket;