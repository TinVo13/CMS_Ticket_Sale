import React from 'react'
import { Avatar, Col, ConfigProvider, Input, Layout, Row, Space } from 'antd'
import { SearchOutlined, MailOutlined, BellOutlined } from '@ant-design/icons';

const Topbar: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFB800',
        },
        components: {
          Input: {
            colorBgContainer: '#EDEDED'
          }
        }
      }}>
      <Layout style={{ padding: '0 8px' }}>
        <Row justify={'space-between'} align={'middle'}>
          <Col span={9}>
            <Input
              color='#EDE6E6'
              placeholder='Search'
              suffix={<SearchOutlined />} />
          </Col>
          <Col>
            <Space direction='horizontal' size={'middle'}>
              <MailOutlined />
              <BellOutlined />
              <Avatar />
            </Space>
          </Col>
        </Row>
      </Layout>

    </ConfigProvider>
  )
}

export default Topbar