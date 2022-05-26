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
  Card,
  Progress,
  Collapse,
} from 'antd';
import Loader from '../../components/Loader';
import { getProject, updateProject } from '../../firestore/projects';
import { getGroupsFromDb } from '../../firestore/groups';
import TaskList from '../../components/Project/TaskList';
import Group from '../../components/Project/Group';

const { Title, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
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
          <div>
            <Card style={{ backgroundColor: '#F7F7F7' }}>
              <Title level={2}>{project.title}</Title>
              <Divider />
              <p>{project.description}</p>
              <Space direction='vertical'>
                <Text strong>
                  {project.dueDate.toDate().toLocaleDateString()}
                </Text>
              </Space>
              <Progress
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                percent={59.5}
              />
            </Card>

            <Collapse>
              <Panel header='Deliverables'>
                {project.deliverables.map((deliverable, index) => (
                  <li key={deliverable.id}>
                    {deliverable.title} - <Text strong>Due Date:</Text>{' '}
                    {deliverable.dueDate.toDate().toLocaleDateString()}
                    <br />
                  </li>
                ))}
              </Panel>

              <Panel
                header={`Group`}
                extra={
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
                }
              >
                <Group
                  group={groups.find((group) => group.id === project.groupId)}
                />
              </Panel>
            </Collapse>
          </div>

          <Divider orientation='center'>
            <Title level={2} style={{ marginBottom: '0' }}>
              Tasks
            </Title>
          </Divider>
          <TaskList
            group={groups.find((group) => group.id === project.groupId)}
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
