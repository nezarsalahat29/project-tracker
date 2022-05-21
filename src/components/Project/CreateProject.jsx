import React, { useState } from 'react';
import { Button, Modal, Form, DatePicker, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createProject } from '../../firestore/projects';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
// const formItemLayoutWithOutLabel = {
//   wrapperCol: {
//     xs: { span: 24, offset: 0 },
//     sm: { span: 20, offset: 4 },
//   },
// };

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
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
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
                {fields.map((field, index) => (
                  <Form.Item
                    {...formItemLayout}
                    // label={index === 0 ? 'Deliverables' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            'Please input deliverable or delete this field.',
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder='deliverable'
                        style={{ width: '60%' }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className='dynamic-delete-button'
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
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
                  {/* <Button
                  type='dashed'
                  onClick={() => {
                    add('The head item', 0);
                  }}
                  style={{ width: '50%' }}
                  icon={<PlusOutlined />}
                >
                  Add field at head
                </Button> */}
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item name='endDate' label='End Date'>
          <DatePicker />
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
    console.log({ ...values, endDate: values.endDate.toDate() });
    setConfirmLoading(true);
    await createProject({ ...values, dueDate: values.endDate.toDate() });
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
