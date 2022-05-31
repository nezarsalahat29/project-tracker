import React from "react";

import { Button,Drawer,Modal } from "antd";

import {
  AppstoreAddOutlined,

} from "@ant-design/icons";

import { Row, Col } from "antd";

import {  Form, Input,  DatePicker, Space } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


export default function AddNewTask() {
  const [Taskvisible, setTaskVisible] = React.useState(false);
  const showTaskDrawer = () => {
    setTaskVisible(true);
  };

  const TaskonClose = () => {
    setTaskVisible(false);
  };
  const [newTask,setNewTask]=React.useState({ title:"",
  dueDate:"",
  description:"",
  resources:[]});

  const [form] = Form.useForm();
  
  const onReset = () => {
    form.resetFields();
  };
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
          
            <Drawer  title="Add New Task"
            width={720}
            
            visible={Taskvisible}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
              <Space>
                <Button onClick={TaskonClose}>Cancel</Button>
              </Space>
            }>
            <Form {...layout} form={form} name="control-hooks" onFinish={(values)=>{setNewTask(...newTask,values.title,values.dueDate,values.description,values.resources1);console.log(newTask)}}>
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
                    style={{marginTop:"40px"}}
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
                    style={{marginTop:"40px"}}
                  >
                    <Input.TextArea rows={4} placeholder="Task Description" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="resources1"
                    label="Resources "
                    style={{marginTop:"40px"}}
                    
                  >
                    <Input rows={4} placeholder="Please Enter URL" />
                  </Form.Item>
                  
                </Col>
              </Row>
  

              <Form.Item style={{marginTop:"40px"}} {...tailLayout} >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
       
      </Form.Item>
                
            </Form>
            </Drawer>
          
        </Col>
      </Row>
    
    </>
  );
}
