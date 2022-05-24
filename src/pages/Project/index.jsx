//urgent/necessery edits:
//anything came from old dashboard needs to be deleted.
//export and return should be fixed so navbar can navigate to project page & project page renders properly

import React from "react";
import "./index.css";
import { Liquid } from "@ant-design/plots";
import TasksLists from "../Tasks";
import { Button } from "antd";
import { Alert } from "antd";
import { AppstoreAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Layout, Divider } from "antd";

import { Row, Col, Collapse, Radio } from "antd";

import { Drawer, Form, Input, Select, DatePicker, Space } from "antd";
import Calendar from "../../components/Dashboard/Calendar";
import { List } from "antd";

import { TeamOutlined } from "@ant-design/icons";
import { Progress } from "antd";
/****************************************************************/

/*function LiquidP() {
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
}*/

export default function Project() {
  const [Taskvisible, setTaskVisible] = React.useState(false);
  const [Groupvisible, setGroupVisible] = React.useState(false);
  const { Header } = Layout;

  const showTaskDrawer = () => {
    setTaskVisible(true);
  };

  const showGroupDrawer = () => {
    setGroupVisible(true);
  };

  const TaskonClose = () => {
    setTaskVisible(false);
  };
  const GrouponClose = () => {
    setGroupVisible(false);
  };
  const { Panel } = Collapse;

  const data = [
    { id: 133050, title: "Jebril" },
    { id: 133051, title: "Nezar" },
    { id: 133052, title: "Hedaya" },
    { id: 133053, title: "Mohannad" },
  ];

  <Alert message="Informational Notes" type="info" showIcon />;

  const Projects = {
    id: 13305,
    description: `Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Curabitur tristique quam sed tristique molestie.
      Ut maximus dui et felis egestas rutrum. Praesent nec erat aliquet,
      congue eros non, imperdiet lorem. Quisque libero nisi, faucibus a
      felis eu, fermentum posuere ex. Quisque nec ex leo.`,
    startDate: "12-Jul-2022",
    endDAte: "7-Aug-2022",
    Title: "Project Tracker",
    tasks: ["task1", "task2", "task3"],
    Progress: 0.75,
    deliverables: [
      "Project Tracker delevierable (1)",
      "Project Tracker delevierable (1)",
      "Project Tracker delevierable (1)",
    ],
  };
  return (
    <>
      <div>
        <h1>{Projects.Title}</h1>
        <br />
      </div>

      <Row
        gutter={8}
        style={{
          marginTop: "50px",
        }}
      >
        <Col span={12} style={{ padding: "50px" }}>
          <h1>Project ID: {Projects.id}</h1>
          <div className="Description">{Projects.description}</div>
        </Col>

        <Col span={12} style={{ padding: "50px", marginTop: "85px" }}>
          <Alert
            message="Warning"
            description="No group is assigned to this project yet!"
            type="info"
            showIcon
          />
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="Group 1" key="1">
              <p>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<TeamOutlined />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.id}
                      />
                    </List.Item>
                  )}
                />
              </p>
            </Panel>
          </Collapse>
          <div style={{ textAlign: "right" }}>
            <Button
              type="primary"
              onClick={showGroupDrawer}
              size="large"
              style={{
                backgroundColor: "0092ff",
                borderColor: "#0092ff",
                borderRadius: "500",
                marginTop: "20px",
                size: "20px",
              }}
              icon={
                <UsergroupAddOutlined
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                />
              }
            >
              Assign Project To Group
            </Button>
          </div>
        </Col>
      </Row>

      <Drawer
        title="Assign Project To Group "
        width={720}
        onClose={GrouponClose}
        visible={Groupvisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={GrouponClose}>Cancel</Button>
            <Button onClick={GrouponClose} type="primary">
              Assign
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark style={{ paddingLeft: 70 }}>
          <div className="GroupLabel">
            Which Group do you want to assign to this project?:
          </div>
          <div className="RadioGroup">
            <Row gutter={12}>
              <Col span={18}>
                <Form.Item
                  name="radio-button"
                  label=" "
                  rules={[{ required: true, message: "Please pick a Group!" }]}
                >
                  <Radio.Group style={{ marginBlock: 30 }}>
                    <Radio.Button value="Group 1">Group 1</Radio.Button>
                    <Radio.Button value="Group 2">Group 2</Radio.Button>
                    <Radio.Button value="Group 3">Group 3</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Collapse defaultActiveKey={["1"]} style={{ width: 500 }}>
            <Panel header="Group 1" key="1">
              <p>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<TeamOutlined />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.id}
                      />
                    </List.Item>
                  )}
                />
              </p>
            </Panel>
          </Collapse>
        </Form>
      </Drawer>
      <div style={{ textAlign: "center" }}>
        <h2>Work progres:</h2>
        <div style={{ textAlign: "center",position:"relative",left:110 }}>
          <Row gutter={6}>
            <Progress
              style={{
                width: "90%",
                
                marginBottom: "25px",
              }}
              
              strokeColor={{
                "0%": "#5ebcff",
                "100%": "#162b3b",
              }}

              trailColor="#c9c8c5"
              percent={75}
            />
          </Row>
        </div>
      </div>

      <Divider orientation="center"></Divider>

      <h1 style={{ textAlign: "center", fontWeight: "bold", marginTop: 75 }}>
        Tasks Lists
      </h1>
      <br />

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
      <TasksLists />
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
    </>
  );
}
