import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";
import { Typography, Button, Layout, Menu, Breadcrumb, Image } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Row, Col, Divider } from "antd";

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

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, currentUser } = useAuth();
  console.log(currentUser);

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
          <div>{currentUser.uid}</div>
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
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            Bill is not a cat.
            <div className="site-card-border-less-wrapper">
              <Card
                title="Project Name + ID"
                bordered={false}
                style={{ width: 300 }}
              >
                <p>Description</p>
                <p>Progress</p>
                <p>Start Date - Due date</p>
              </Card>
            </div>
            <Button type="primary" onClick="">
              Assign To Group
            </Button>
            <Button type="primary" shape="circle">
              +
            </Button>
            <hr />
            <Divider orientation="left">
              <strong>Tasks Lists</strong>
            </Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-box" span={6}>
                <div className="gutter-row">
                  To-Do
                  <Card title="Task-Title">
                    <p>Description</p>
                    <p>StartDate-EndDate</p>
                  </Card>
                  <hr />
                  <Card title="Task-Title">
                    <p>Description</p>
                    <p>StartDate-EndDate</p>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-box" span={6}>
                <div className="gutter-row">
                  In Progress
                  <Card title="Task-Title">
                    <p>Description</p>
                    <p>StartDate-EndDate</p>
                  </Card>
                  <hr />
                  <Card title="Task-Title">
                    <p>Description</p>
                    <p>StartDate-EndDate</p>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-box" span={6}>
                <div className="gutter-row">
                  Done
                  <Card title="Task-Title">
                    <p>Description</p>
                    <p>StartDate-EndDate</p>
                  </Card>
                  <hr />
                  <Card title="Task-Title">
                    <p>Description</p>
                    <p>StartDate-EndDate</p>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-box" span={6}>
                <div className="gutter-row">
                  Late Tasks
                  <Card title="Task-Title">
                    <p>Description</p>
                    <p>StartDate-EndDate</p>
                  </Card>
                  <hr />
                  <Card title="Task-Title">
                    <p>Description</p>
                    <p>StartDate-EndDate</p>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
