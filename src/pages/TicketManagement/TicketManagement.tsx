import { ConfigProvider, Layout, Space, Tabs, TabsProps, Typography, theme } from 'antd';
import React from 'react'
import Family from '../../components/FamilyTicket/FamilyTicket';
import EventTicket from '../../components/EventTicket/EventTicket';

const { Text } = Typography;
const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Gói gia đình`,
    children: (
      <Family/>
    )
  },
  {
    key: '2',
    label: `Gói sự kiện`,
    children: (
      <EventTicket/>
    )
  },
];
const TicketManagement: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgLayout: colorBgContainer
        }
      }}>
      <Layout style={{ borderRadius: 24,padding:16 }}>
        <Text className='page-title'>Quản lý vé</Text>
        <Tabs items={items} defaultActiveKey='1' />
      </Layout>
    </ConfigProvider>

  )
}

export default TicketManagement