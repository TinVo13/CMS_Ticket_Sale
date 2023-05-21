import React from 'react'
import { Button, Col, ConfigProvider, Input, Layout, Row, Space, Table, Typography, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TicketType } from '../../types/type';
import { SearchOutlined } from '@ant-design/icons';
import AddTicket from '../../components/AddTicket/AddTicket';

const datas: TicketType[] = [
  {
    key:'1',
    giaCombo: '360.000',
    giaVe: '90.000',
    maGoi: 'ALT94348',
    ngayApDung: '14/02/2023',
    ngayHetHan: '15/02/2023',
    tenGoiVe: 'Gói gia đình',
    tinhTrang: 'Đang sử dụng'
  }
]
const { Text } = Typography;
const Setting: React.FC = () => {
  const [openModel,setOpenModel] = React.useState<boolean>(false);
  const handleAddTicket=(ticket:TicketType)=>{
    setOpenModel(false);
  }
  const columns: ColumnsType<TicketType> = [
    {
      title: 'STT',
      render: (text, record, index) => (
        index + 1
      )
    },
    {
      title: 'Mã gói',
      dataIndex: 'maGoi',
      key: 'maGoi'
    },
    {
      title: 'Tên gói vé',
      dataIndex: 'tenGoiVe',
      key: 'tenGoiVe'
    },
    {
      title: 'Ngày áp dụng',
      dataIndex: 'ngayApDung',
      key: 'ngayApDung'
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'ngayHetHan',
      key: 'ngayHetHan'
    },
    {
      title: 'Giá vé (VNĐ/Vé)',
      dataIndex: 'giaVe',
      key: 'giaVe'
    },
    {
      title: 'Giá combo (VNĐ/Combo)',
      dataIndex: 'giaCombo',
      key: 'giaCombo'
    },
    {
      title: 'Tình trạng',
      dataIndex: 'tinhTrang',
      key: 'tinhTrang'
    },
  ]
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFB800',
          colorBgLayout: colorBgContainer
        },
        components: {
          Input: {
            colorBgContainer: '#EDEDED'
          },
          Button: {
            colorBorder: '#FFB800'
          }
        }
      }}>
      <Layout style={{ borderRadius: 24, padding: '8px 16px' }}>
        <Space direction='vertical'>
          <Text className='page-title'>Danh sách gói vé</Text>
          <Row justify={'space-between'}>
            <Col>
              <Input
                placeholder='Tìm bằng số vé'
                prefix={<SearchOutlined />} />
            </Col>
            <Col>
              <Space>
                <Button style={{ color: '#FFB800', fontWeight: 'bold' }} onClick={()=>setOpenModel(true)}>Xuất file (.csp)</Button>
                <Button style={{ background: '#FFB800', color: 'white', fontWeight: 'bold' }}>Thêm gói vé</Button>
              </Space>
            </Col>
          </Row>
          <Table dataSource={datas} columns={columns} />
        </Space>
        <AddTicket 
        isOpen={openModel} 
        isClose={()=>setOpenModel(false)}
        handleAddTicket={(ticket:TicketType)=>handleAddTicket(ticket)}/>
      </Layout>
    </ConfigProvider>
  )
}

export default Setting;