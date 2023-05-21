import React from 'react'
import { Avatar, ConfigProvider, Input, Layout, Row, Space } from 'antd'
import { SearchOutlined, MailOutlined, BellOutlined } from '@ant-design/icons';

const Topbar: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFB800',
        },
        components:{
          Input:{
            colorBgContainer:'#EDEDED'
          }
        }
      }}>
      <Layout style={{padding:'0 8px'}}>
        <Row justify={'space-between'} align={'middle'}>
          <Input
            color='#EDE6E6'
            placeholder='Search'
            suffix={<SearchOutlined />}
            style={{ width: 470,}} />
          <Space direction='horizontal'>
            <MailOutlined />
            <BellOutlined />
            <Avatar />
          </Space>
        </Row>
      </Layout>

    </ConfigProvider>
  )
}

export default Topbar