import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import {
  Space,
  Typography,
  Divider,
  Card,
  Progress,
  Collapse,
  Alert,
} from 'antd';
import Loader from '../../components/Loader';
import { getProject, updateProject } from '../../firestore/projects';
import {
  getGroupFromDb,
  getGroupsFromDb,
  updateGroup,
} from '../../firestore/groups';
import TaskList from '../../components/Project/TaskList';
import Group from '../../components/Project/Group';
import SelectGroup from '../../components/Project/SelectGroup';
import { useAuth } from '../../contexts/AuthContext';
import FaultPage from '../faultPage';

const { Title, Text } = Typography;
const { Panel } = Collapse;
export default function Project() {
  var { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [progress, setProgress] = useState();
  const [userInProject, setUserInProject] = useState(true);
  const { currentUser } = useAuth();

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
      if (id === 'myProject') {
        const group = await getGroupFromDb(currentUser.groupId);
        console.log(group);
        // eslint-disable-next-line
        if (group && group.projectId) id = group.projectId;
        else setUserInProject(false);
        console.log(group.projectId);
      }
      const project = await getProject(id);
      const groups = await getGroupsFromDb();
      setProject(project);
      setGroups(groups);
      setLoading(false);
      getProgress(project.tasks);
    };

    getData();
  }, [id, getProgress]);

  const onGroupSelect = async (groupId) => {
    if (project.groupId !== groupId) {
      await updateProject(id, {
        ...project,
        tasks: project.tasks.map((task) => ({ ...task, students: [] })),
      });
    }

    if (project.groupId)
      await updateGroup(project.groupId, { projectId: null });
    await updateProject(id, { groupId });
    if (groupId) await updateGroup(groupId, { projectId: id });
    setProject((project) => ({ ...project, groupId }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : !userInProject ? (
        <>
          <Alert
            message='Informational Notes'
            description='You have not been assigned to a project yet!'
            type='info'
            showIcon
          />
          <FaultPage />
        </>
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
                {project.deliverables.map((deliverable) => (
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
                  currentUser.instructor && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <SelectGroup
                        onGroupSelect={onGroupSelect}
                        project={project}
                        groups={groups}
                      />
                    </div>
                  )
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
            projectId={project.id}
            projectDueDate={project.dueDate}
            getNewData={getNewData}
            getProgress={getProgress}
          />
        </>
      )}
    </>
  );
}
