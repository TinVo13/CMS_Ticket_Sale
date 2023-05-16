import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import {Outlet} from 'react-router-dom'
import { ConfigProvider, Layout,theme } from 'antd'


const {Content,Footer,Header} = Layout;
const PageContent: React.FC = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FFB800'
                }
            }}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} >
                        <Topbar/>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <Outlet/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}

export default PageContent