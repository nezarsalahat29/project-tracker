import React, { useState } from "react";
import { Form, Modal, Button, DatePicker, Input } from "antd";

const TaskModal = ({ visible, onCreate, onCancel, confirmLoading }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      width={700}
      visible={visible}
      title="Create a new Project"
      okText="Create"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        layout="horizontal"
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input project description" },
          ]}
        >
          <Input.TextArea showCount maxLength={200} />
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function Task({ provided, snapshot, task }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onCreate = () => {
    console.log("create");
  };

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          userSelect: "none",
          padding: "0.5rem",
          margin: "0 0 0.5rem 0",
          background: snapshot.isDragging ? "#4a9cc2" : "#5cc2f2",
          color: "white",
          //   display: 'inline-block',
          //   width: '120px',
          textAlign: "center",
          borderRadius: "5px",
          minHeight: "50px",
          whiteSpace: "nowrap",
          ...provided.draggableProps.style,
        }}
      >
        {task.title}
      </div>
      <TaskModal
        visible={visible}
        onCreate={onCreate}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
