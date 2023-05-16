import React from 'react'
import { ConfigProvider, Menu, Layout } from 'antd';
import {HomeOutlined,DesktopOutlined,FileOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider} = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Trang chủ', '/', <HomeOutlined />),
  getItem('Quản lý vé', '/quan-ly-ve', <DesktopOutlined />),
  getItem('Đối soát vé', '/doi-soat-ve', <DesktopOutlined />),
  getItem('Cài đặt', '/cai-dat', <FileOutlined />),
];
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFB800'
        }
      }}>
        <Sider
          theme='light'
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" >
            Logo here!
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={items}
            onClick={(items)=>navigate(items.key)}
          />
        </Sider>
    </ConfigProvider>
  )
}

export default Sidebar