import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Descriptions, Space, Typography, Divider } from 'antd';
import Loader from '../../components/Loader';
import { getProject } from '../../firestore/projects';
import TaskList from '../../components/Project/TaskList';
import { ProjectTwoTone } from '@ant-design/icons';

const { Title } = Typography;
export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scroll(0, 0);

    const getData = async () => {
      const project = await getProject(id);
      setProject(project);
      setLoading(false);
    };

    getData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
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
                      <div key={index}>
                        deliverable <br />
                      </div>
                    ))}
                  </Descriptions.Item>

                  <Descriptions.Item label='Due Date'>
                    {project.dueDate.toDate().toDateString()}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Divider />
          <Row>
            <TaskList tasks={project.tasks} />
          </Row>
        </>
      )}
    </>
  );
}
