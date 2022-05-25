import React from "react";

import { Liquid } from "@ant-design/plots";

import { Button } from "antd";
import { Alert } from "antd";
import { AppstoreAddOutlined, UsergroupAddOutlined,FileTextOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Layout, Divider } from "antd";

import { Row, Col, Collapse, Radio } from "antd";

import { Drawer, Form, Input, Select, DatePicker, Space } from "antd";


import { List } from "antd";

import { TeamOutlined } from "@ant-design/icons";
import { Progress } from "antd";

export default function AddNewTask(){
    const [Taskvisible, setTaskVisible] = React.useState(false);
    const showTaskDrawer = () => {
        setTaskVisible(true);
      };
    
      const TaskonClose = () => {
        setTaskVisible(false);
      };
    return(
        <>
<div style={{ textAlign: "right" }}>
<Button
  type="primary"
  size="large"
  onClick={showTaskDrawer}
  style={{
    backgroundColor: "0092ff",
    borderColor: "#0092ff",
    borderRadius: "500",
    marginRight:46,
  }}
  icon={
    <AppstoreAddOutlined
      style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
    />
  }
>
  Add New Task
</Button>
</div>
<Row justify="end">
        <Col span={4}>
          <Drawer
            title="Add New Task"
            width={720}
            onClose={TaskonClose}
            visible={Taskvisible}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
              <Space>
                <Button onClick={TaskonClose}>Cancel</Button>
                <Button onClick={TaskonClose} type="primary">
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
      </>);
                }