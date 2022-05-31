import React, { useState } from 'react';

import './index.css';
import { Button, Layout, Menu, Image, Affix, Avatar } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
} from '@ant-design/icons';


const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}



const instructorItems = [
    getItem( "Project", '1', <TeamOutlined />),
  getItem( "Dashboard", '4', <PieChartOutlined />),
 
  getItem("Class", '2', <DesktopOutlined />),
  getItem("Chat", '6', <FileOutlined />),
];

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  
  const items = instructorItems ;
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Affix offsetTop={0}>
        <Sider
          style={{ height: '100vh' }}
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed((collapsed) => !collapsed)}
        >
          <Image
            className='logo'
            src={process.env.PUBLIC_URL + '/logo_transparent.png'}
            preview={false}
          />
          <Menu 
            theme='dark'
            defaultSelectedKeys={['1']}
            mode='inline'
            items={items}
          />
        </Sider>
      </Affix>
      <Layout className='site-layout'>
        
        <Content
          style={{
            
          }}
        >
          
        </Content>
      </Layout>
    </Layout>
  );
}