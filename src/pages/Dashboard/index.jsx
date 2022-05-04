import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";
import { Typography, Button, Layout, Menu, Image } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Class from "../Class/Class.jsx";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const instructorItems = [
  getItem(<Link to="/">Dashboard</Link>, "1", <PieChartOutlined />),
  getItem(<Link to="/Class">Class</Link>, "2", <DesktopOutlined />),
  getItem(<Link to="/Groups">Groups</Link>, "3", <UserOutlined />),
  getItem(<Link to="/Projects">Projects</Link>, "4", <TeamOutlined />),
  getItem(<Link to="/Tasks">Tasks</Link>, "5", <FileOutlined />),
  getItem(<Link to="/Chat">Chat</Link>, "6", <FileOutlined />),
];

const studentItems = [
  getItem(<Link to="/">Dashboard</Link>, "1", <PieChartOutlined />),
  getItem(<Link to="/Project">Project</Link>, "4", <TeamOutlined />),
  getItem(<Link to="/Tasks">Tasks</Link>, "5", <FileOutlined />),
  getItem(<Link to="/Chat">Chat</Link>, "6", <FileOutlined />),
];

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, currentUser } = useAuth();
  console.log(currentUser);
  const items = currentUser.instructor ? instructorItems : studentItems;
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <Image
          className="logo"
          src={process.env.PUBLIC_URL + "/logo_transparent.png"}
          preview={false}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>{currentUser.username}</div>
          {currentUser.instructor ? (
            <div>I'm instructor</div>
          ) : (
            <div> I'm student</div>
          )}
          <Button type="primary" onClick={logout}>
            Sign Out
          </Button>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Class" element={<Class />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Project Tracker ©2022 Created by Ultra8Bits
        </Footer>
      </Layout>
    </Layout>
  );
}
