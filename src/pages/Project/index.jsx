import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Descriptions,
  Space,
  Typography,
  Divider,
  Select,
} from 'antd';
import Loader from '../../components/Loader';
import { getProject, updateProject } from '../../firestore/projects';
import { getGroupsFromDb } from '../../firestore/groups';
import TaskList from '../../components/Project/TaskList';
import Group from '../../components/Project/Group';

const { Title } = Typography;
const { Option } = Select;
export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  const getNewData = async () => {
    const newProject = await getProject(id);
    setProject({
      title: newProject.title,
      description: newProject.description,
      dueDate: newProject.dueDate,
      deliverables: [...newProject.deliverables],
      tasks: [...newProject.tasks.map((task) => ({ ...task }))],
      createdAt: newProject.createdAt,
      lastModified: newProject.lastModified,
      groupId: newProject.groupId || null,
    });
  };

  useEffect(() => {
    window.scroll(0, 0);

    const getData = async () => {
      const project = await getProject(id);
      const groups = await getGroupsFromDb();
      setProject(project);
      setGroups(groups);
      setLoading(false);
    };

    getData();
  }, [id]);

  const onChange = (groupId) => {
    console.log(`selected ${groupId}`);
    updateProject(id, { groupId });
    setProject((project) => ({ ...project, groupId }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row gutter={32}>
            <Col span={12}>
              <Space
                align='baseline'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Title
                  level={2}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '0',
                  }}
                >
                  Project
                </Title>
              </Space>
              <div>
                <Descriptions
                  title={project.title}
                  bordered
                  column={{
                    sm: 1,
                    xs: 1,
                  }}
                >
                  <Descriptions.Item label='Description'>
                    {project.description}
                  </Descriptions.Item>
                  <Descriptions.Item label='Deliverables'>
                    {project.deliverables.map((deliverable, index) => (
                      <li key={deliverable.id}>
                        {deliverable.title} -{' '}
                        {deliverable.dueDate.toDate().toLocaleDateString()}
                        <br />
                      </li>
                    ))}
                  </Descriptions.Item>

                  <Descriptions.Item label='Due Date'>
                    {project.dueDate.toDate().toDateString()}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Col>
            <Col
              span={12}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Space>
                <div>Assigned Group:</div>
                <Select
                  style={{ width: 200 }}
                  defaultValue={project.groupId && `Group ${project.groupId}`}
                  placeholder='Select a group'
                  onChange={onChange}
                >
                  {groups.map((group) => (
                    <Option key={group.id} value={group.id}>
                      {group.id}
                    </Option>
                  ))}
                  <Option value={null}>None</Option>
                </Select>
              </Space>
              <Group
                group={groups.find((group) => group.id === project.groupId)}
              />
            </Col>
          </Row>
          <Divider />
          <TaskList
            tasks={project.tasks}
            projectId={id}
            projectDueDate={project.dueDate}
            getNewData={getNewData}
          />
        </>
      )}
    </>
  );
}
