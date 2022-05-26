import React, { useState } from 'react';
import { Button, Modal, Form, DatePicker, Input } from 'antd';
import { updateProject } from '../../firestore/projects';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const TaskAddForm = ({
  visible,
  onCreate,
  onCancel,
  confirmLoading,
  projectDueDate,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      width={700}
      visible={visible}
      title='Create a new Project'
      okText='Create'
      cancelText='Cancel'
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
            console.log('Validate Failed:', info);
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
        layout='horizontal'
      >
        <Form.Item name='title' label='Title'>
          <Input />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[
            { required: true, message: 'Please input project description' },
          ]}
        >
          <Input.TextArea showCount maxLength={200} />
        </Form.Item>

        <Form.Item
          name='dueDate'
          label='Due Date'
          rules={[
            {
              validator: async (_, value) => {
                if (
                  value > moment(projectDueDate.toDate()) ||
                  value < new Date()
                ) {
                  return Promise.reject(new Error('Due date not valid!'));
                }
              },
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function AddTask({
  projectId,
  otherTasks,
  getNewData,
  projectDueDate,
}) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onCreate = async (values) => {
    setConfirmLoading(true);
    await updateProject(projectId, {
      tasks: [
        ...otherTasks,
        {
          ...values,
          id: uuidv4(),
          dueDate: values.dueDate.toDate(),
          status: 'todo',
          comments: [],
          resources: [],
        },
      ],
    });
    getNewData();
    setConfirmLoading(false);
    setVisible(false);
  };

  return (
    <>
      <Button type='primary' onClick={() => setVisible(true)}>
        Add Task
      </Button>
      <TaskAddForm
        visible={visible}
        projectDueDate={projectDueDate}
        onCreate={onCreate}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
