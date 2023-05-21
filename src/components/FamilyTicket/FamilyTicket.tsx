import React from 'react'
import { Badge, Button, Checkbox, Col, ConfigProvider, DatePicker, Input, Layout, Modal, Radio, Row, Space, Table, Tag, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

interface FamilyTicketType {
    key: string,
    stt: number,
    bookingCode: string,
    soVe: number,
    tinhTrangSuDung: string,
    ngaySuDung: string,
    ngayXuatVe: string,
    congCheckIn: string
}

const datas: FamilyTicketType[] = [
    {
        key: '1',
        stt: 1,
        soVe: 237434392,
        bookingCode: "JASDJSDA",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        key: '2',
        stt: 2,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        key: '3',
        stt: 3,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Chưa sử dụng'
    },
    {
        key: '4',
        stt: 4,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Chưa sử dụng'
    },
    {
        key: '5',
        stt: 5,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        key: '6',
        stt: 6,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        key: '7',
        stt: 7,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Hết hạn'
    },
    {
        key: '8',
        stt: 8,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        key: '9',
        stt: 9,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Chưa sử dụng'
    },
    {
        key: '10',
        stt: 10,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        key: '11',
        stt: 11,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        key: '12',
        stt: 12,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
]
const { Text } = Typography;
const FamilyTicket: React.FC = () => {
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [modalOpen, setModalOpen] = React.useState(false);
    const columns: ColumnsType<FamilyTicketType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
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
                    {record.tinhTrangSuDung.includes('Chưa sử dụng')&&<Tag color='success' bordered><Badge status='success' text={record.tinhTrangSuDung} style={{ color: '#03AC00' }} /></Tag>}
                    {record.tinhTrangSuDung.includes('Hết hạn')&&<Tag color='error' bordered><Badge status='error' text={record.tinhTrangSuDung} style={{ color: 'red' }} /></Tag>}
                </Space>
            )
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'ngaySuDung',
            key: 'ngaySuDung',
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
                                <Button onClick={()=>setModalOpen(true)}>
                                    <Text strong>Lọc vé</Text>
                                </Button>
                                <Button>
                                    <Text strong>Xuất file (.CSV)</Text>
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                    <Table
                        pagination={{ pageSize: 7, position: ['bottomCenter'] }}
                        size='middle'
                        columns={columns}
                        dataSource={datas}
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
                    footer={true}
                    closable={false}
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                >
                    <Space style={{ width: '100%' }} direction='vertical'>
                        <Row>
                            <Col md={12}>
                                <Space direction='vertical'>
                                    <Text>Từ ngày</Text>
                                    <DatePicker format={'DD/MM/YYYY'} />
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space direction='vertical'>
                                    <Text>Đến ngày</Text>
                                    <DatePicker format={"DD/MM/YYYY"} />
                                </Space>
                            </Col>
                        </Row>
                        <Text>Tình trạng sử dụng</Text>
                        <Radio.Group>
                            <Radio checked>Tất cả</Radio>
                            <Radio>Đã sử dụng</Radio>
                            <Radio>Chưa sử dụng</Radio>
                            <Radio>Hết hạn</Radio>
                        </Radio.Group>
                        <Text>Cổng Check - in</Text>
                        <Checkbox.Group>
                            <Checkbox checked={false}>Tất cả</Checkbox>
                            <Checkbox>Cổng 1</Checkbox>
                            <Checkbox>Cổng 2</Checkbox>
                            <Checkbox>Cổng 3</Checkbox>
                            <Checkbox>Cổng 4</Checkbox>
                            <Checkbox>Cổng 5</Checkbox>
                        </Checkbox.Group>
                        <Row justify={'center'}>
                            <Button>Lọc</Button>
                        </Row>
                    </Space>
                </Modal>
            </Layout>
        </ConfigProvider>
    )
}

export default FamilyTicket;