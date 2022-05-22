//urgent/necessery edits:
//anything came from old dashboard needs to be deleted.
//export and return should be fixed so navbar can navigate to project page & project page renders properly

import React from "react";
import "./index.css";
import { Liquid } from "@ant-design/plots";
import TasksLists from "../Tasks";
import { Button, } from "antd";

import {

  AppstoreAddOutlined,
} from "@ant-design/icons"; 
import { Card } from "antd";

import { Row, Col, Divider } from "antd";

import { Drawer, Form, Input, Select, DatePicker, Space } from "antd";
import Calendar from "../../components/Dashboard/Calendar";
import Title from "antd/lib/skeleton/Title";
/****************************************************************/

function LiquidP() {
  const config = {
    percent: 0.7,
    outline: {
      distance: 8,
    },
    wave: {
      length: 130,
    },
  };
  return (
    <div style={{ width: 300, height: 300 }}>
      <Liquid {...config} />
    </div>
  );
}
export default function Taskk() {
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  /************************************************************* */

  const Projects = [
    {
      id: 1,
      description:
        "You will find here the description of this project and other details",
      startDate: "12-Jul-2022",
      endDAte: "7-Aug-2022",
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
            <Row style={{
              fontWeight: "bolder",
              fontSize: "40px",
              fontFamily: "cursive",
              textAlign: "center",
            }} >

              {e.Title}
              <div className="site-card-border-less-wrapper">
                <Card
                  headStyle={{ fontFamily: "-moz-initial", fontSize: "25px" }}
                  title={e.description}
                  bordered={false}
                  style={{ width: 800 }}
                  bodyStyle={{
                    fontWeight: "bold",
                    fontFamily: "-moz-initial",
                    fontSize: "18px",
                  }}
                >

                  <p>Project ID: {e.id}</p> <br />
                  <Row>
                    <Col offset={0}>
                      <Divider orientation="left">
                        <p style={{
                          fontWeight: "bold",
                          fontSize: "25px",
                          fontFamily: "cursive",
                          textAlign: "center",
                        }}>Work Sumary</p>
                        <LiquidP />
                      </Divider>

                    </Col>
                    <Col span={7} offset={6}>
                      Start Date      →     End Date <br />
                      {e.startDate}   →  {e.endDAte}
                      <br /><br />
                      <Calendar />
                    </Col>
                  </Row>

                </Card>
              </div>

            </Row>
          );


        })}

      </Row>

      <TasksLists />
      <Row justify="end">
        <Col span={4}>
          {" "}
          <Button
            type="primary"
            onClick={showDrawer}
            style={{
              backgroundColor: "0092ff",
              borderColor: "#0092ff",
              borderRadius: "500",
            }}
            icon={
              <AppstoreAddOutlined
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              />
            }
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
                    rules={[
                      { required: true, message: "Please Enter Task Title: " },
                    ]}
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
                    rules={[
                      {
                        required: true,
                        message: "Please Select Project Name: ",
                      },
                    ]}
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
                    rules={[
                      { required: true, message: "Select Project Leader" },
                    ]}
                  >
                    <Input placeholder="Please Enter Project Leader Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="DateTime"
                    label="DateTime"
                    rules={[
                      { required: true, message: "Please choose the DateTime" },
                    ]}
                  >
                    <DatePicker.RangePicker
                      style={{ width: "120%" }}
                      getPopupContainer={(trigger) => trigger.parentElement}
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
                        message: "Please Enter Task Description",
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
      </Row>
    </>
  );
}
