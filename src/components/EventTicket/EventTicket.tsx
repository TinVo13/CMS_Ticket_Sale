import React from 'react'
import { Badge, Button, Checkbox, Col, ConfigProvider, DatePicker, Input, Layout, Modal, Popover, Radio, Row, Space, Tag, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import { EventTicketType } from '../../types/type';

const datas: EventTicketType[] = [
  {
    key: '1',
    soVe: 237434392,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "JASDJSDA",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Đã sử dụng'
  },
  {
    key: '2',
    soVe: 823299438,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Đã sử dụng'
  },
  {
    key: '3',
    soVe: 823299438,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Đã sử dụng'
  },
  {
    key: '4',
    soVe: 823299438,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Đã sử dụng'
  },
  {
    key: '5',
    soVe: 823299438,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Chưa sử dụng'
  },
  {
    key: '6',
    soVe: 823299438,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Hết hạn'
  },
  {
    key: '7',
    soVe: 823299438,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Chưa sử dụng'
  },
  {
    key: '8',
    soVe: 823299438,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Hết hạn'
  },
  {
    key: '9',
    soVe: 823299438,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Đã sử dụng'
  },
  {
    key: '10',
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    soVe: 823299438,
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Đã sử dụng'
  },
  {
    key: '11',
    soVe: 823299438,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Đã sử dụng'
  },
  {
    key: '12',
    soVe: 823299438,
    tenSuKien: 'Hội chợ triễn lẵm tiêu dùng 2021',
    bookingCode: "KIYDSDAN",
    congCheckIn: 'Cong 1',
    ngaySuDung: '17/05/2023',
    ngayXuatVe: '17/05/2023',
    tinhTrangSuDung: 'Đã sử dụng'
  },
]
const { Text } = Typography;
const EventTicket: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const columns: ColumnsType<EventTicketType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value, record, index) => (
        index + 1
      )
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
      render: (_, record) => (
        <Space>
          {record.tinhTrangSuDung.includes("Đã sử dụng") && <Tag color='default'><Badge status='default' text={record.tinhTrangSuDung} style={{ color: '#919DBA' }} /></Tag>}
          {record.tinhTrangSuDung.includes('Chưa sử dụng') && <Tag color='success' bordered><Badge status='success' text={record.tinhTrangSuDung} style={{ color: '#03AC00' }} /></Tag>}
          {record.tinhTrangSuDung.includes('Hết hạn') && <Tag color='error' bordered><Badge status='error' text={record.tinhTrangSuDung} style={{ color: 'red' }} /></Tag>}
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
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF993C'
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
      <Layout>
        <Space direction='vertical'>
          <Row justify={'space-between'}>
            <Col>
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
                <Button style={{ fontWeight: 'bold' }}>
                  Xuất file (.CSV)
                </Button>
              </Space>
            </Col>
          </Row>
          <Table
            size='middle'
            pagination={{ pageSize: 7,position:['bottomCenter'] }}
            dataSource={datas}
            columns={columns} />
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

export default EventTicket