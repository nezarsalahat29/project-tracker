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
const { Panel } = Collapse;
const { Option } = Select;
export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  const getNewData = async () => {
    const newProject = await getProject(id);
    setProject((project) => ({ ...project, tasks: newProject.tasks }));
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
      {console.log('project in code: ', project)}
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

            <Card style={{ backgroundColor: '#F7F7F7' }}>
              <Title level={2}>Deliverables</Title>
              <Collapse>
                {project.deliverables.map((deliverable) => (
                  <Panel header={deliverable.title} key={deliverable.id}>
                    <p>
                      {deliverable.description ||
                        'Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy Dummy'}
                    </p>
                    <p>
                      <Text strong>Due Date:</Text>{' '}
                      {deliverable.dueDate.toDate().toLocaleDateString()}
                    </p>
                  </Panel>
                ))}
              </Collapse>
            </Card>
          </div>

          <Divider />
          <TaskList
            tasks={project.tasks}
            projectId={id}
            getNewData={getNewData}
          />
        </>
      )}
    </>
  );
}
