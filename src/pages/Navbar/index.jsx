import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './index.css';
import { Button, Layout, Menu, Image, Affix, Avatar } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Class from '../Class';
import FaultPage from '../faultPage';
import Project from '../Project';
import Chat from '../Chat';

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
  getItem(<Link to='/'>Dashboard</Link>, '1', <PieChartOutlined />),
  getItem(<Link to='/Class'>Class</Link>, '2', <DesktopOutlined />),
  getItem(<Link to='/Chat'>Chat</Link>, '6', <FileOutlined />),
];

const studentItems = [
  getItem(<Link to='/'>Dashboard</Link>, '1', <PieChartOutlined />),
  getItem(<Link to='/Project'>Project</Link>, '4', <TeamOutlined />),
  getItem(<Link to='/Chat'>Chat</Link>, '6', <FileOutlined />),
];

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, currentUser } = useAuth();

  const items = currentUser.instructor ? instructorItems : studentItems;
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
          onCollapse={() => setCollapsed(!collapsed)}
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
        <Header
          className='site-layout-background'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(240, 240, 240)',
          }}
        >
          <Avatar
            style={{
              backgroundColor: '#1890ff',
              verticalAlign: 'middle',
            }}
            size='large'
            gap={4}
          >
            {currentUser.name[0].toUpperCase()}
          </Avatar>
          <Button type='primary' onClick={logout}>
            Sign Out
          </Button>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            className='site-layout-background'
            style={{
              padding: 24,
              minHeight: '100%',
            }}
          >
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/Class' element={<Class />} />
              <Route path='/Chat' element={<Chat />} />
              <Route path='*' element={<FaultPage />} />
              <Route path='/project/:id' element={<Project />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
