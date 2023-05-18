import React from 'react'
import { Button, Col, ConfigProvider, Input, Layout, Row, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

interface FamilyTicketType {
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
        stt: 1,
        soVe: 237434392,
        bookingCode: "JASDJSDA",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 2,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 3,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 4,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 5,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 6,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 7,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 8,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 9,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 10,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 11,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
    {
        stt: 12,
        soVe: 823299438,
        bookingCode: "KIYDSDAN",
        congCheckIn: 'Cong 1',
        ngaySuDung: '17/05/2023',
        ngayXuatVe: '17/05/2023',
        tinhTrangSuDung: 'Đã sử dụng'
    },
]
const Family: React.FC = () => {
    const [searchValue, setSearchValue] = React.useState<string>("");
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
        <ConfigProvider>
            <Layout style={{ minHeight: '100%' }}>
                <Space direction='vertical'>
                    <Row>
                        <Col span={24}>
                            <Input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                                placeholder='Tìm bằng số vé'
                                suffix={<SearchOutlined />} />
                            <Button>Lọc vé</Button>
                            <Button>Xuất file</Button>
                        </Col>
                    </Row>
                    <Table
                        pagination={{ pageSize: 8, position: ['bottomCenter'] }}
                        size='small'
                        columns={columns}
                        dataSource={datas}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} />
                </Space>
            </Layout>
        </ConfigProvider>
    )
}

export default Family