import React from 'react'
import { Button, Col, ConfigProvider, Input, Layout, Row, Space, Table, Typography, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TicketPackage, TicketPackageType } from '../../types/type';
import { SearchOutlined } from '@ant-design/icons';
import AddTicket from '../../components/AddTicket/AddTicket';
import { addPackage, ticketPackageCollection } from '../../firebase/controller';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';

const { Text } = Typography;
const Setting: React.FC = () => {
  const [openModel, setOpenModel] = React.useState<boolean>(false);
  const [ticketPackage, setTicketPackage] = React.useState<TicketPackage[]>();
  const handleAddTicket = (ticket: TicketPackageType) => {
    const number: number = Math.floor(Math.random() * 99999) + 10000;
    ticket.key = String(number);
    ticket.maGoi = "ALT" + number;
    addPackage(ticket);
    setOpenModel(false);
  }
  React.useEffect(() => {
    onSnapshot(ticketPackageCollection, (snapshot: QuerySnapshot<DocumentData>) => {
      setTicketPackage(
        snapshot.docs.map((doc) => {
          return {
            key: doc.id,
            ...doc.data()
          }
        })
      )
    })
  }, [])
  const columns: ColumnsType<TicketPackage> = [
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
                <Button style={{ color: '#FFB800', fontWeight: 'bold' }} >Xuất file (.csp)</Button>
                <Button style={{ background: '#FFB800', color: 'white', fontWeight: 'bold' }} onClick={() => setOpenModel(true)}>Thêm gói vé</Button>
              </Space>
            </Col>
          </Row>
          <Table dataSource={ticketPackage} columns={columns} />
        </Space>
        <AddTicket
          isOpen={openModel}
          isClose={() => setOpenModel(false)}
          handleAddTicket={(ticket: TicketPackageType) => handleAddTicket(ticket)} />
      </Layout>
    </ConfigProvider>
  )
}

export default Setting;