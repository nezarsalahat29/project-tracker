//urgent/necessery edits:
//anything came from old dashboard needs to be deleted.
//export and return should be fixed so navbar can navigate to project page & project page renders properly

import React, { useState } from "react";
import "./index.css";
import { Liquid } from "@ant-design/plots";
import LiquidPlot from "../../components/Dashboard/Liquid"
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
import { Drawer, Form, Input, Select, DatePicker, Space } from 'antd';
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
/****************************************************************/
const { option } = Select;
export default function Taskk() {
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  /************************************************************* */
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


  return (
    <>
      <Row gutter={26}>
        {Projects.map((e) => {
          return (
            <Row>
              <Divider orientation="center" style={{ fontWeight: "bolder", fontSize: "40px", fontFamily: "cursive" }}>{e.Title}</Divider>
              <div className="site-card-border-less-wrapper">
                <Card
                  headStyle={{ fontFamily: "-moz-initial", fontSize: "25px" }}
                  title={e.description}
                  bordered={false}
                  style={{ width: 800 }}
                  bodyStyle={{ fontWeight: "bold", fontFamily: "-moz-initial", fontSize: "20px" }}
                >
                  <Row>
                    <Col span={12}>
                      <p>Start Date: {e.startDate}</p>
                    </Col>
                    <Col span={12}>
                      <p>End Date: {e.endDAte}</p>
                    </Col>

                  </Row>

                  <p>ID: {e.id}</p>

                  <Col span={18}>
                    <LiquidPlot />
                  </Col>







                </Card>
              </div>
              <Progress width={20} percent={e.Progress * 100} />
            </Row>


          );
        })}
      </Row>


      <Row justify="end">

        <Col span={4}>
          {" "}
          <Button type="primary" onClick={showDrawer} style={{ backgroundColor: "#002766", borderColor: "#002766", borderRadius: "500" }}
            icon={
              <AppstoreAddOutlined style={{ fontSize: 20, fontWeight: "bold", color: "white" }} />}
          >
            Add New Task
          </Button>
          <Drawer
            title="Add New Task"
            width={720}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} type="primary">
                  Submit
                </Button>
              </Space>
            }
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Task Title"
                    label="Task Title: "
                    rules={[{ required: true, message: 'Please Enter Task Title: ' }]}
                  >
                    <Input placeholder="Please Enter Task Title" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Project Name"
                    label="Project Name: "
                    rules={[{ required: true, message: 'Please Select Project Name: ' }]}
                  >
                    <Select placeholder=" Project Name:">
                      <option value="xiao">Project 1 </option>
                      <option value="mao">Project 2</option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Project Leader"
                    label="Project Leader: "
                    rules={[{ required: true, message: 'Select Project Leader' }]}
                  >
                    <Input placeholder="Please Enter Project Leadr Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>

                <Col span={12}>
                  <Form.Item
                    name="DateTime"
                    label="DateTime"
                    rules={[{ required: true, message: 'Please choose the DateTime' }]}
                  >
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentElement}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Task Description: "
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Task Description',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="Task Description" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>

        </Col>
        <TasksLists />
      </Row>




    </>
  );

}

