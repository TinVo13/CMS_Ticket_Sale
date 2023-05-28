import React from 'react'
import { Badge, Button, Checkbox, Col, ConfigProvider, DatePicker, Input, Layout, Modal, Popover, Radio, RadioChangeEvent, Row, Space, Table, Tag, Typography } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { ticketFamilyPackageCollection } from '../../firebase/controller';
import { TicketFamilyPackage } from '../../types/type';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import * as XLSX from 'xlsx';

interface Filter {
    tuNgay: string,
    denNgay: string,
    tinhTrangSuDung: string,
    congCheckIn: CheckboxValueType[]
}
const { Text } = Typography;
const FamilyTicket: React.FC = () => {
    const listCongCheckIn = new Set<String>();
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<string[]>([]);
    const [ticketFamilyPackage, setTicketFamilyPackage] = React.useState<TicketFamilyPackage[]>();

    const [filter, setFilter] = React.useState<Filter>({
        tuNgay: '01/01/2001',
        denNgay: '01/01/2001',
        tinhTrangSuDung: 'Tất cả',
        congCheckIn: ['Tất cả']
    });

    const handleConfirm = () => {
        setModalOpen(false);
        listCongCheckIn.forEach((value) => {
            console.log(value);
        })
    }
    const handleOnchange = (item: CheckboxChangeEvent) => {
        // if (listCongCheckIn.has(item.target.value) || !item.target.checked) {
        //     listCongCheckIn.delete(item.target.value);
        //     return;
        // }
        // listCongCheckIn.add(item.target.value);
        // console.log(listCongCheckIn);
        //
        const { value, checked } = item.target;
        if (checked) {
            setSelectedCheckboxes([...selectedCheckboxes, value]);
        } else {
            setSelectedCheckboxes(selectedCheckboxes.filter((option) => option !== value));
        }
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
    // const filterData = () => {
    //     const filteredData = ticketFamilyPackage?.filter((row) => selectedCheckboxes.includes(row.congCheckIn!));
    //     return filteredData;
    // };
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
                var ngaySuDung = String(record.ngaySuDung);
                var convertDate = new Date(ngaySuDung);
                var valueDate = new Date(value);
                return convertDate.valueOf() > valueDate.valueOf();
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
            // filteredValue: [],
            // onFilter: (value: any, record) => {
            //     selectedCheckboxes.map(value => {
            //         if (value === 'Tất cả') {
            //             return record.congCheckIn === 'Tất cả';
            //         }
            //     })
            // }
        },
        {
            dataIndex: 'options',
            key: 'options',
            render: (_, record) => (
                <Space>
                    <Popover content={(
                        <Space direction='vertical'>
                            <Button type='ghost'>Sử dụng vé</Button>
                            <Button type='ghost'>Đổi ngày sử dụng</Button>
                        </Space>
                    )} trigger={'click'} color='#FFD2A8'>
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
                    },
                    Input: {
                        colorBgContainer: '#F7F7F8'
                    },
                    Typography: {
                        colorText: '#FF993C'
                    },
                }
            }}>
            <Layout style={{ minHeight: '100%' }}>
                <Space direction='vertical'>
                    <Row justify={'space-between'}>
                        <Col>
                            <Input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                                placeholder='Tìm bằng số vé'
                                suffix={<SearchOutlined />}
                                style={{ width: 446 }} />
                        </Col>
                        <Col>
                            <Space>
                                <Button onClick={() => setModalOpen(true)}>
                                    <Text strong>Lọc vé</Text>
                                </Button>
                                <Button onClick={()=>handleDownloadCSV()}>
                                    <Text strong>Xuất file (.CSV)</Text>
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
                    <Space style={{ width: '100%' }} direction='vertical'>
                        <Row>
                            <Col md={12}>
                                <Space direction='vertical'>
                                    <Text>Từ ngày</Text>
                                    <DatePicker format={'YYYY/MM/DD'} onChange={(date, dateString) => { setFilter({ ...filter, tuNgay: dateString }) }} />
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space direction='vertical'>
                                    <Text>Đến ngày</Text>
                                    <DatePicker format={"YYYY/MM/DD"} onChange={(date, dateString) => setFilter({ ...filter, denNgay: dateString })} />
                                </Space>
                            </Col>
                        </Row>
                        <Text>Tình trạng sử dụng</Text>
                        <Radio.Group onChange={(e: RadioChangeEvent) => setFilter({ ...filter, tinhTrangSuDung: e.target.value })}
                            defaultValue={'Tất cả'}>
                            <Radio value={'Tất cả'}>Tất cả</Radio>
                            <Radio value={'Đã sử dụng'}>Đã sử dụng</Radio>
                            <Radio value={'Chưa sử dụng'}>Chưa sử dụng</Radio>
                            <Radio value={'Hết hạn'}>Hết hạn</Radio>
                        </Radio.Group>
                        <Text>Cổng Check - in</Text>
                        <Row justify={'space-between'}>
                            <Checkbox defaultChecked onChange={(e: CheckboxChangeEvent) => {
                                e.target.checked ? setDisabled(true) : setDisabled(false);
                                listCongCheckIn.clear();
                            }}>Tất cả</Checkbox>
                            <Checkbox value={'Cổng 1'} disabled={disabled}
                                onChange={(e: CheckboxChangeEvent) => handleOnchange(e)}>Cổng 1</Checkbox>
                            <Checkbox value={'Cổng 2'} disabled={disabled}
                                onChange={(e: CheckboxChangeEvent) => handleOnchange(e)}>Cổng 2</Checkbox>
                        </Row>
                        <Row justify={'space-between'}>
                            <Checkbox value={'Cổng 3'} disabled={disabled}
                                onChange={(e: CheckboxChangeEvent) => handleOnchange(e)}>Cổng 3</Checkbox>
                            <Checkbox value={'Cổng 4'} disabled={disabled}
                                onChange={(e: CheckboxChangeEvent) => handleOnchange(e)}>Cổng 4</Checkbox>
                            <Checkbox value={'Cổng 5'} disabled={disabled}
                                onChange={(e: CheckboxChangeEvent) => handleOnchange(e)}>Cổng 5</Checkbox>
                        </Row>
                        <Row justify={'center'}>
                            <Button htmlType='submit' onClick={() => handleConfirm()}>Lọc</Button>
                        </Row>
                    </Space>
                </Modal>
            </Layout>
        </ConfigProvider>
    )
}

export default FamilyTicket;