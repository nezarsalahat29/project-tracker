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
  Avatar,
} from 'antd';
// import Loader from '../Loader';
import { SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useAuth } from '../../contexts/AuthContext';
import { updateProject } from '../../firestore/projects';
const TaskModal = ({
  visible,
  onUpdate,
  onCancel,
  confirmLoading,
  taskProp,
  projectId,
  otherTasks,
  projectDueDate,
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
    form.resetFields();

    setTask((task) => ({ ...task, comments: [...task.comments, comment] }));
    updateProject(projectId, {
      otherTasks: otherTasks.map((t) => {
        if (t.id === task.id)
          return { ...task, comments: [...task.comments, comment] };
        return t;
      }),
    });
    console.log({ ...task, comments: [...task.comments, comment] });
  };

  const addResource = () => {
    const resource = {
      url: form.getFieldValue('resource'),
      uid: currentUser.id,
      name: currentUser.name,
      time: new Date(),
    };
    form.resetFields();

    setTask((task) => ({ ...task, resources: [...task.resources, resource] }));
    updateProject(projectId, {
      otherTasks: otherTasks.map((t) => {
        if (t.id === task.id)
          return { ...task, resources: [...task.resources, resource] };
        return t;
      }),
    });
    console.log(task);
  };

  return (
    <>
      {!loading && (
        <Modal
          width={1000}
          visible={visible}
          title={task.title}
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
                onUpdate(values);
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
                  style={{
                    overflowY: 'auto',
                    height: 250,
                  }}
                  renderItem={(item) => (
                    <li>
                      <Comment
                        author={item.name}
                        avatar={
                          <Avatar
                            src={
                              'https://ui-avatars.com/api/?background=random&name=' +
                              item.name
                            }
                          />
                        }
                        content={item.text}
                        datetime={
                          item.time.toDate
                            ? item.time.toDate().toLocaleString()
                            : item.time.toLocaleString()
                        }
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
                  style={{ overflowY: 'auto', height: 250 }}
                  renderItem={(item) => (
                    <li>
                      <Comment
                        author={item.name}
                        avatar={
                          <Avatar
                            src={
                              'https://ui-avatars.com/api/?background=random&name=' +
                              item.name
                            }
                          />
                        }
                        content={<a href={`${item.url}`}>{item.url}</a>}
                        datetime={
                          item.time.toDate
                            ? item.time.toDate().toLocaleString()
                            : item.time.toLocaleString()
                        }
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

export default function Task({
  provided,
  snapshot,
  task,
  projectId,
  otherTasks,
  projectDueDate,
  getNewData,
}) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onUpdate = (values) => {
    console.log(values);
    setConfirmLoading(true);
    updateProject(projectId, {
      tasks: otherTasks.map((t) => {
        if (t.id === task.id)
          return {
            ...task,
            title: values.title,
            description: values.description,
            dueDate: values.dueDate.toDate(),
          };
        return t;
      }),
    });
    getNewData();
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
        projectId={projectId}
        projectDueDate={projectDueDate}
        otherTasks={otherTasks}
        visible={visible}
        onUpdate={onUpdate}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
