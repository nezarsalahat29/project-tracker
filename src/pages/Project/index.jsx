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
const Projects = [{
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




function Project() {
return(
<>
      
            <Divider orientation="center">Projects</Divider>
    <Row gutter={26}>
            {Projects.map((e)=>{
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
     </>
);
}
export default Project;
    
    
  


             
         