import React, { useState } from 'react';
import { Button, Modal, Form, DatePicker, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createProject } from '../../firestore/projects';
import { v4 as uuidv4 } from 'uuid';

const ProjectCreateForm = ({ visible, onCreate, onCancel, confirmLoading }) => {
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
        //   initialValues={{
        //     size: componentSize,
        //   }}
        //   onValuesChange={onFormLayoutChange}
        //   size={componentSize}
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

        <Form.Item name='dueDate' label='Due Date'>
          <DatePicker />
        </Form.Item>

        <Form.Item label='Deliverables'>
          <Form.List
            name='deliverables'
            rules={[
              {
                validator: async (_, deliverables) => {
                  if (!deliverables || deliverables.length < 1) {
                    return Promise.reject(new Error('At least 1 deliverable'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 2 }}
                    align='baseline'
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            'Please input deliverable or delete this field.',
                        },
                      ]}
                    >
                      <Input placeholder='deliverable' style={{ width: 350 }} />
                    </Form.Item>

                    <Form.Item
                      name={[name, 'dueDate']}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (value > getFieldValue('dueDate')) {
                              return Promise.reject(
                                new Error('Due date too late!')
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <DatePicker
                        placeholder='Deliverable due date'
                        style={{ width: '100%' }}
                      />
                    </Form.Item>

                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className='dynamic-delete-button'
                        onClick={() => remove(name)}
                      />
                    ) : null}
                  </Space>
                ))}
                <Form.Item style={{ marginBottom: 2 }}>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Deliverable
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item label='Tasks'>
          <Form.List name='tasks'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 2 }}
                    align='baseline'
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      rules={[
                        { required: true, message: 'Missing task title' },
                      ]}
                    >
                      <Input placeholder='Task title' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      rules={[
                        { required: true, message: 'Missing task description' },
                      ]}
                    >
                      <Input placeholder='Task description' />
                    </Form.Item>

                    <Form.Item
                      name={[name, 'dueDate']}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (value > getFieldValue('dueDate')) {
                              return Promise.reject(
                                new Error('Due date too late!')
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <DatePicker
                        placeholder='Task due date'
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item style={{ marginBottom: 2 }}>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Task
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function CreateProject({ getData }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onCreate = async (values) => {
    console.log({
      ...values,
      dueDate: values.dueDate.toDate(),
      tasks: values.tasks.map((task) => ({
        ...task,
        id: uuidv4(),
        dueDate: task.dueDate.toDate(),
      })),
      deliverables: values.deliverables.map((deliverable) => ({
        ...deliverable,
        id: uuidv4(),
        dueDate: deliverable.dueDate.toDate(),
      })),
    });
    setConfirmLoading(true);
    await createProject({
      ...values,
      dueDate: values.dueDate.toDate(),
      tasks:
        values.tasks.map((task) => ({
          ...task,
          id: uuidv4(),
          dueDate: task.dueDate.toDate(),
          status: 'todo',
          comments: [],
          resources: [],
        })) || [],
      deliverables: values.deliverables.map((deliverable) => ({
        ...deliverable,
        id: uuidv4(),
        dueDate: deliverable.dueDate.toDate(),
      })),
    });
    getData();
    setConfirmLoading(false);
    setVisible(false);
  };

  return (
    <>
      <Button type='primary' onClick={() => setVisible(true)}>
        Create Project
      </Button>
      <ProjectCreateForm
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
