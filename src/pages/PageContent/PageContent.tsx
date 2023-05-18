import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import {Outlet} from 'react-router-dom'
import { ConfigProvider, Layout } from 'antd'


const {Content,Header} = Layout;
const PageContent: React.FC = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FFB800',
                    colorBgLayout:'#F9F6F4'
                }
            }}>
            <Layout style={{ minHeight: '100vh',padding:8 }}>
                <Sidebar />
                <Layout>
                    <Header style={{ padding: 0}} >
                        <Topbar/>
                    </Header>
                    <Content style={{ padding: '0 8px' }}>
                        <Outlet/>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}

export default PageContent