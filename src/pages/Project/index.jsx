//urgent/necessery edits:
//anything came from old dashboard needs to be deleted.
//export and return should be fixed so navbar can navigate to project page & project page renders properly

import React from "react";
import "./index.css";
import { Liquid } from "@ant-design/plots";
import TasksLists from "../Tasks";
import { Button } from "antd";

import { AppstoreAddOutlined } from "@ant-design/icons";
import { Card } from "antd";

import { Row, Col, Collapse, Radio } from "antd";

import { Drawer, Form, Input, Select, DatePicker, Space } from "antd";
import Calendar from "../../components/Dashboard/Calendar";
import { Avatar, List } from "antd";

import { TeamOutlined } from "@ant-design/icons";
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
export default function Project() {
  const [Taskvisible, setTaskVisible] = React.useState(false);
  const [Groupvisible, setGroupVisible] = React.useState(false);

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

  /************************************************************* */

  const Projects = [
    {
      id: 1,
      description:
        "You will find here the description of this project and other details",
      startDate: "12-Jul-2022",
      endDAte: "7-Aug-2022",
      Title: "Project Name",
      tasks: ["task1", "task2", "task3"],
      Progress: 0.6,
      deliverables: ["dev1", "dev2", "dev3"],
    },
  ];

  return (
    <>
      {Projects.map((e) => {
        return (
          <div>
            <h1>{e.Title}</h1>
            <br />
            <span>
              {" "}
              <Collapse defaultActiveKey={["1"]}>
                <Panel header="Group 1" key="1">
                  <p>
                    {" "}
                    <List
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<TeamOutlined />}
                            title={
                              <a href="https://ant.design">{item.title}</a>
                            }
                            description={item.id}
                          />
                        </List.Item>
                      )}
                    />
                  </p>
                </Panel>
              </Collapse>
              <Button
                type="primary"
                onClick={showGroupDrawer}
                style={{
                  backgroundColor: "0092ff",
                  borderColor: "#0092ff",
                  borderRadius: "500",
                  marginTop: "20px",
                }}
                icon={
                  <AppstoreAddOutlined
                    style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  />
                }
              >
                Assign Project To Group
              </Button>
            </span>

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
              <Form
                layout="vertical"
                hideRequiredMark
                style={{ paddingLeft: 70 }}
              >
                <div className="GroupLabel">
                  Which Group do you want to assign to this project?:
                </div>
                <div className="RadioGroup">
                  {" "}
                  <Row gutter={12}>
                    <Col span={18}>
                      <Form.Item
                        name="radio-button"
                        label=" "
                        rules={[
                          { required: true, message: "Please pick a Group!" },
                        ]}
                      >
                        <Radio.Group style={{  marginBlock:30,}}>
                          <Radio.Button value="Group 1">Group 1</Radio.Button>
                          <Radio.Button value="Group 2">Group 2</Radio.Button>
                          <Radio.Button value="Group 3">Group 3</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <Collapse defaultActiveKey={["1"]} style={{width:500}}>
                <Panel header="Group 1" key="1">
                  <p>
                    {" "}
                    <List
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<TeamOutlined />}
                            title={
                              <a href="https://ant.design">{item.title}</a>
                            }
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

            <h3>Project ID: {e.id}</h3>
            <p>
              {" "}
              {e.description}...Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Curabitur tristique quam sed tristique molestie.
              Ut maximus dui et felis egestas rutrum. Praesent nec erat aliquet,
              congue eros non, imperdiet lorem. Quisque libero nisi, faucibus a
              felis eu, fermentum posuere ex. Quisque nec ex leo.
            </p>
            <br />
            <br />

            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col span={8}>
                  <Card.Grid
                    title="Work Summary"
                    bordered={true}
                    style={{
                      width: 400,
                      height: 400,
                      fontWeight: "bold",
                      fontSize: "25px",
                      //fontFamily: "cursive",
                      textAlign: "center",
                    }}
                  >
                    <p>Work Summary</p>
                    <LiquidP />
                  </Card.Grid>
                </Col>
                <Col span={5}></Col>
                <Col span={8}>
                  <Card.Grid
                    title="Project Calendar"
                    bordered={true}
                    hoverable={true}
                    style={{
                      width: 400,
                      height: 400,
                      fontWeight: "bold",
                      fontSize: "25px",
                      //fontFamily: "cursive",
                      textAlign: "center",
                    }}
                  >
                    <p>Project Calendar</p>
                    <Calendar />
                  </Card.Grid>
                </Col>
              </Row>
            </div>
          </div>

          /************************************************************/
        );
      })}

      <TasksLists />
      <Row justify="end">
        <Col span={4}>
          {" "}
          <Button
            type="primary"
            onClick={showTaskDrawer}
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
