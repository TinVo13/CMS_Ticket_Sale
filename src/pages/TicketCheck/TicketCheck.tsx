import React from 'react'
import { Button, Col, ConfigProvider, DatePicker, Input, Layout, Radio, RadioChangeEvent, Row, Space, Table, Typography, theme } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { TicketCheckType } from '../../types/type';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { ticketCheckPackageCollection } from '../../firebase/controller';

const { Text } = Typography;
const TicketCheck: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [value,setValue] = React.useState<string>('');
  const [ticketCheck,setTicketCheck] = React.useState<TicketCheckType[]>();


  React.useEffect(() => {
    onSnapshot(ticketCheckPackageCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        setTicketCheck(
            snapshot.docs.map((doc) => {
                return {
                    key: doc.id,
                    ...doc.data()
                }
            })
        )
    })
}, [])
  const columns: ColumnsType<TicketCheckType> = [
    {
      title: 'STT',
      render: (text, record, index) => (
        index + 1
      )
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
      title: 'Ngày sử dụng',
      dataIndex: 'ngaySuDung',
      key: 'ngaySuDung',
    },
    {
      title: 'Tên loại vé',
      dataIndex: 'tenLoaiVe',
      key: 'tenLoaiVe',
    },
    {
      title: 'Cổng check - in',
      dataIndex: 'congCheckIn',
      key: 'congCheckIn',
    },
    {
      dataIndex:'doiSoat',
      key:'doiSoat',
      render:(_,record)=>(
        <Space>
          {record.doiSoat?.includes('Đã đối soát')&&<Text type='danger' italic>{record.doiSoat}</Text>}
          {record.doiSoat?.includes('Chưa đối soát')&&<Text type='secondary' italic>{record.doiSoat}</Text>}
        </Space>
      )
    }
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
          Button: {
            colorBgContainer: '#FFB800',
            colorText: 'white',
          },
        }
      }}>
      <Row gutter={24}>
        <Col span={17}>
          <Layout style={{borderRadius:24,padding:16,height:'75ch'}}>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Text className='page-title'>Đối soát vé</Text>
              <Row justify={'space-between'}>
                <Col>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder='Tìm bằng số vé'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
                </Col>
                <Col>
                  <Button>Chốt đối soát</Button>
                </Col>
              </Row>
              <Table
                dataSource={ticketCheck}
                columns={columns}
                pagination={{pageSize:6}}/>
            </Space>
          </Layout>
        </Col>
        <Col span={7}>
          <Layout style={{borderRadius:24,padding:16,height:'75ch'}}>
            <Space direction='vertical' size={'middle'}>
              <Text strong style={{fontSize:24}}>Lọc vé</Text>
              <Row>
                <Col span={12}>
                  <Text>Tình trạng đối soát</Text>
                </Col>
                <Col span={12}>
                  <Radio.Group onChange={(e:RadioChangeEvent)=>setValue(e.target.value)} value={value}>
                    <Radio value={''}>Tất cả</Radio>
                    <Radio value={'Đã đối soát'}>Đã đối soát</Radio>
                    <Radio value={'Chưa đối soát'}>Chưa đối soát</Radio>
                  </Radio.Group>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text>Loại vé</Text>
                </Col>
                <Col span={12}>
                  Vé cổng
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text>Từ ngày</Text>
                </Col>
                <Col span={12}>
                  <DatePicker format={'DD/MM/YYYY'} disabled/>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text>Đến ngày</Text>
                </Col>
                <Col span={12}>
                  <DatePicker format={'DD/MM/YYYY'}/>
                </Col>
              </Row>
              <Row justify={'center'}>
                <Button style={{background:'white',borderColor:'#FFB800',color:'#FFB800',fontWeight:'bold'}}>Lọc</Button>
              </Row>
            </Space>
          </Layout>
        </Col>
      </Row>
    </ConfigProvider>
  )
}

export default TicketCheck