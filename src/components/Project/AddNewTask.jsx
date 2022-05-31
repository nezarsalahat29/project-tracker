import React from "react";

import { Button,Modal } from "antd";

import {
  AppstoreAddOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from "@ant-design/icons";

import { Row, Col } from "antd";

import { Drawer, Form, Input, Select, DatePicker, Space } from "antd";

export default function AddNewTask() {
  const [Taskvisible, setTaskVisible] = React.useState(false);
  const showTaskDrawer = () => {
    setTaskVisible(true);
  };

  const TaskonClose = () => {
    setTaskVisible(false);
  };
  const [newTask,setNewTask]=React.useState({});
  const oKhandle=()=>{
    setNewTask({
      title:"",
      dueDate:"",
      description:"",
      resources:""

    })
  }
  return (
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
            marginRight: 46,
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
          
            <Modal  title="Add New Task"
            width={720}
            onCancel={TaskonClose}
            visible={Taskvisible}
            onOK={oKhandle}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
              <Space>
                <Button onClick={TaskonClose}>Cancel</Button>
                <Button onClick={TaskonClose} type="primary">
                  Submit
                </Button>
              </Space>
            }>
            <Form layout="vertical" hideRequiredMark onFinish={(values)=>{console.log(values.title)}}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="title"
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
                    name="dueDate"
                    label="Due Date"
                    rules={[
                      { required: true, message: "Please choose the DueDate" },
                    ]}
                  >
                    <DatePicker
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
              <Row gutter={16}>
                <Col span={24}>



                <Form.List name="resources">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  
                >
                  <Input placeholder="Please Enter URL" />
                </Form.Item>
               
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Resources
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
                </Col>
              </Row>
            </Form>
            </Modal>
          
        </Col>
      </Row>
    
    </>
  );
}
