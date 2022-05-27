import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import { Space, Typography, Divider, Card, Progress, Collapse } from 'antd';
import Loader from '../../components/Loader';
import { getProject, updateProject } from '../../firestore/projects';
import { getGroupsFromDb } from '../../firestore/groups';
import TaskList from '../../components/Project/TaskList';
import Group from '../../components/Project/Group';
import SelectGroup from '../../components/Project/SelectGroup';

const { Title, Text } = Typography;
const { Panel } = Collapse;
export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [progress, setProgress] = useState();

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

  const getProgress = useCallback((tasks) => {
    const tasksLength = tasks.length;
    let doneTasks = 0;
    tasks.forEach((task) => {
      if (task.status === 'done' || task.status === 'delayed') doneTasks++;
    });

    setProgress((doneTasks / tasksLength).toFixed(2) * 100);
  }, []);

  useEffect(() => {
    window.scroll(0, 0);

    const getData = async () => {
      const project = await getProject(id);
      const groups = await getGroupsFromDb();
      setProject(project);
      setGroups(groups);
      setLoading(false);
      getProgress(project.tasks);
    };

    getData();
  }, [id, getProgress]);

  const onGroupSelect = (groupId) => {
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
                percent={progress}
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
                header='Group'
                extra={
                  <div onClick={(e) => e.stopPropagation()}>
                    <SelectGroup
                      onGroupSelect={onGroupSelect}
                      project={project}
                      groups={groups}
                    />
                  </div>
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
            getProgress={getProgress}
          />
        </>
      )}
    </>
  );
}
