//urgent/necessery edits:
//anything came from old dashboard needs to be deleted.
//export and return should be fixed so navbar can navigate to project page & project page renders properly

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./index.css";
import TasksLists from "../Tasks";
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
import { Progress } from "antd";
import { Descriptions } from "antd";
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
const Projects = [
  {
    id: 1,
    description:
      "You will find here the description of this project and other details",
    startDate: "12-7-2022",
    endDAte: "7-8-2022",
    Title: "Project 1",
    tasks: ["task1", "task2", "task3"],
    Progress: 0.6,
    deliverables: ["dev1", "dev2", "dev3"],
  },
];

function Project() {
  return (
    <>
      <Row gutter={26}>
        {Projects.map((e) => {
          return (
            <Row>
              <Divider orientation="center">{e.Title}</Divider>
              <div className="site-card-border-less-wrapper">
                <Card
                  title={e.description}
                  bordered={false}
                  style={{ width: 800 }}
                >
                  <p>Start Date: {e.startDate}</p>
                  <p>End Date: {e.endDAte}</p>
                  <p>ID: {e.id}</p>
                </Card>
              </div>
              <Progress width={20} percent={e.Progress * 100} />
            </Row>
          );
        })}
      </Row>
      <Divider orientation="Center">
        <Row>TASKS</Row>
      </Divider>
      <Row justify="end">
        <Col span={12}></Col>
        <Col span={4}>
          {" "}
          <Button
            icon={
              <AppstoreAddOutlined style={{ color: "#0092ff", fontSize: 20 }} />
            }
          >
            Add Task
          </Button>
        </Col>
        <TasksLists/>
      </Row>
    </>
  );
}
export default Project;
