import React from 'react'
import { Col, ConfigProvider, Input, Layout, Row, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';

interface EventTicketType {
  stt: number,
  bookingCode: string,
  soVe: number,
  tenSuKien: string,
  tinhTrangSuDung: string,
  ngaySuDung: string,
  ngayXuatVe: string,
  congCheckIn: string
}
const EventTicket: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const columns: ColumnsType<EventTicketType> = [
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
      title: 'Tên sự kiện',
      dataIndex: 'tenSuKien',
      key: 'tenSuKien',
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
  const datas: EventTicketType[] = [
    {
      stt: 1,
      soVe: 237434392,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "JASDJSDA",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
    {
      stt: 2,
      soVe: 823299438,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "KIYDSDAN",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
    {
      stt: 3,
      soVe: 823299438,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "KIYDSDAN",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
    {
      stt: 4,
      soVe: 823299438,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "KIYDSDAN",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
    {
      stt: 5,
      soVe: 823299438,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "KIYDSDAN",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
    {
      stt: 6,
      soVe: 823299438,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "KIYDSDAN",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
    {
      stt: 7,
      soVe: 823299438,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "KIYDSDAN",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
    {
      stt: 8,
      soVe: 823299438,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "KIYDSDAN",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
    {
      stt: 9,
      soVe: 823299438,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "KIYDSDAN",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
    {
      stt: 10,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
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
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "KIYDSDAN",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
    {
      stt: 12,
      soVe: 823299438,
      tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
      bookingCode: "KIYDSDAN",
      congCheckIn: 'Cong 1',
      ngaySuDung: '17/05/2023',
      ngayXuatVe: '17/05/2023',
      tinhTrangSuDung: 'Đã sử dụng'
    },
  ]
  return (
    <ConfigProvider>
      <Layout>
        <Space direction='vertical'>
          <Row>
            <Col>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                placeholder='Tìm bằng số vé'
                suffix={<SearchOutlined />} />
            </Col>
          </Row>
          <Table
            size='middle'
            pagination={{ pageSize: 8 }}
            dataSource={datas}
            columns={columns} />
        </Space>
      </Layout>
    </ConfigProvider>
  )
}

export default EventTicket