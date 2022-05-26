import React, { useEffect, useState } from 'react';
import {
  Form,
  Modal,
  Button,
  DatePicker,
  Input,
  List,
  Comment,
  Row,
  Col,
} from 'antd';
// import Loader from '../Loader';
import { SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useAuth } from '../../contexts/AuthContext';
const TaskModal = ({
  visible,
  onCreate,
  onCancel,
  confirmLoading,
  taskProp,
}) => {
  const [task, setTask] = useState();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { currentUser } = useAuth();

  useEffect(() => {
    setTask(taskProp);
    setLoading(false);
  }, [taskProp]);

  const addComment = () => {
    const comment = {
      text: form.getFieldValue('comment'),
      uid: currentUser.id,
      name: currentUser.name,
      time: new Date(),
    };

    setTask((task) => ({ ...task, comments: [...task.comments, comment] }));
    console.log(task);
  };

  const addResource = () => {
    const resource = {
      url: form.getFieldValue('resource'),
      uid: currentUser.id,
      name: currentUser.name,
      time: new Date(),
    };

    setTask((task) => ({ ...task, resources: [...task.resources, resource] }));
    console.log(task);
  };

  return (
    <>
      {!loading && (
        <Modal
          width={1000}
          visible={visible}
          title='Create a new Project'
          okText='Edit'
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
            initialValues={{
              title: task.title,
              description: task.description,
              dueDate: moment(task.dueDate.toDate()),
            }}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 19,
            }}
            layout='horizontal'
          >
            <Form.Item name='title' label='Title'>
              <Input disabled={!currentUser.instructor} />
            </Form.Item>

            <Form.Item
              name='description'
              label='Description'
              rules={[
                { required: true, message: 'Please input project description' },
              ]}
            >
              <Input.TextArea
                showCount
                maxLength={200}
                disabled={!currentUser.instructor}
              />
            </Form.Item>

            <Form.Item name='dueDate' label='Due Date'>
              <DatePicker disabled={!currentUser.instructor} />
            </Form.Item>

            <Row gutter={16}>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <List
                  className='comment-list'
                  header={`comments`}
                  itemLayout='horizontal'
                  dataSource={task.comments}
                  renderItem={(item) => (
                    <li>
                      <Comment
                        // actions={item.actions}
                        author={item.name}
                        // avatar={item.avatar}
                        content={item.text}
                        datetime={moment(item.time.toLocaleString())}
                      />
                    </li>
                  )}
                />

                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Form.Item name='comment'>
                    <Input style={{ width: 400 }} placeholder='add comment' />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType='submit'
                      onClick={addComment}
                      type='primary'
                    >
                      <SendOutlined />
                    </Button>
                  </Form.Item>
                </div>
              </Col>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <List
                  className='resource-list'
                  header={`resources`}
                  itemLayout='horizontal'
                  dataSource={task.resources}
                  renderItem={(item) => (
                    <li>
                      <Comment
                        actions={item.actions}
                        author={item.name}
                        avatar={item.avatar}
                        content={item.url}
                        datetime={item.time}
                      />
                    </li>
                  )}
                />

                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Form.Item name='resource'>
                    <Input style={{ width: 400 }} placeholder='add resource' />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType='submit'
                      onClick={addResource}
                      type='primary'
                    >
                      <SendOutlined />
                    </Button>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default function Task({ provided, snapshot, task }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onCreate = () => {
    setConfirmLoading(true);
    console.log('create');
    setConfirmLoading(false);
    setVisible(false);
  };

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          userSelect: 'none',
          padding: '0.5rem',
          margin: '0 0 0.5rem 0',
          background: snapshot.isDragging ? '#4a9cc2' : '#5cc2f2',
          color: 'white',
          //   display: 'inline-block',
          //   width: '120px',
          textAlign: 'center',
          borderRadius: '5px',
          minHeight: '50px',
          whiteSpace: 'nowrap',
          ...provided.draggableProps.style,
        }}
      >
        {task.title}
      </div>
      <TaskModal
        taskProp={task}
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
