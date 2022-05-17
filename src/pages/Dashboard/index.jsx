import React, { useState } from 'react';
import Class from '../Class';
import { useAuth } from '../../contexts/AuthContext';
import './index.css';
import { Button, Layout, Menu, Image } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
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

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8'),
    ]),
    getItem('Files', '9', <FileOutlined />),
];

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const { logout, currentUser } = useAuth();
    console.log(currentUser);

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
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
            <Layout className='site-layout'>
                <Header
                    className='site-layout-background'
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>{currentUser.uid}</div>
                    {currentUser.instructor ? (
                        <div>I'm instructor</div>
                    ) : (
                        <div> I'm student</div>
                    )}
                    <Button type='primary' onClick={logout}>
                        Sign Out
                    </Button>
                </Header>
                <Content
                    style={{
                        margin: '16px',
                    }}
                >
                    <div
                        className='site-layout-background'
                        style={{
                            padding: 24,
                            height: '100%',
                            // minHeight: 360,
                        }}
                    >
                        <Class />
                    </div>
                </Content>
                {/* <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout>
    );
}
