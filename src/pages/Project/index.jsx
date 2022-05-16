//urgent/necessery edits:
//anything came from old dashboard needs to be deleted.
//export and return should be fixed so navbar can navigate to project page & project page renders properly

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
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Row, Col, Divider } from "antd";
import { Progress } from 'antd';
import { Descriptions } from 'antd';
const { Meta } = Card;
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
export const Project = [{
  id:1,
  description: "You will find here the description of this project and other details",
  startDate: "12-7-2022",
  endDAte: "7-8-2022",
  Title: "Project 1",
  tasks: ["task1","task2","task3"],
  Progress: 0.6,
  deliverables : ["dev1","dev2","dev3"]

},
{
  id:2,
  description: "You will find here the description of this project and other details",
  startDate: "9-7-2022",
  endDAte: "22-8-2022",
  Title: "Project 2",
  tasks: ["task1","task2","task3"],
  Progress: 0.9,
  deliverables : ["dev1","dev2","dev3"]

},
{
  id:3,
  description: "You will find here the description of this project and other details",
  startDate: "1-7-2022",
  endDAte: "7-8-2022",
  Title: "Project 3",
  tasks: ["task1","task2","task3"],
  Progress: 0,
  deliverables : ["dev1","dev2","dev3"]

},
{  id:4,
  description: "You will find here the description of this project and other details",
  startDate: "18-7-2022",
  endDAte: "26-8-2022",
  Title: "Project 4",
  tasks: ["task1","task2","task3"],
  Progress: 0.43,
  deliverables : ["dev1","dev2","dev3"]

},
];




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

      
            <Divider orientation="center">Projects</Divider>
    <Row gutter={26}>
            {Project.map((e)=>{
       return (
        <Col  span={6}>
        <Card
        hoverable
        style={{ width: 200 }}
        
        
      >
        <Meta title={e.Title} description={e.description}  onClick="" />
        <p>From: {e.startDate}</p>
        <p className="btnk">To: {e.endDAte}</p>
        <Progress percent={e.Progress*100} />

          
          
      </Card>
      </Col>
     );})}
    
     
     </Row>
     <Divider orientation="right">
     <Row>
     <Button icon={
      <AppstoreAddOutlined style={{color : '#0092ff',fontSize:20}}/> 
     }>
Add Project
     </Button>
     </Row>
     </Divider>

    
    
    
  


             
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