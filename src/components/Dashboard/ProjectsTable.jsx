
import { Table, Card, Typography, Space } from 'antd';
import { useEffect, useState } from 'react';
import CreateProject from '../Project/CreateProject';
import { getAllProjects, deleteProject } from '../../firestore/projects';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const columns = [
  {
    title: 'Project',
    dataIndex: 'title',
    key: 'title',
    render: (title, record) => (
      <Link to={`/project/${record.id}`}>{title}</Link>
    ),
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    defaultSortOrder: 'descend',
    render: (date) => date.toDate().toLocaleString(),
    sorter: {
      compare: (a, b) => a.createdAt - b.createdAt,
      multiple: 1,
    },
  },
  {
    title: 'Last Modified',
    dataIndex: 'lastModified',
    key: 'lastModified',
    defaultSortOrder: 'descend',
    render: (date) => date.toDate().toLocaleString(),

    sorter: {
      compare: (a, b) => a.lastModified - b.lastModified,
      multiple: 2,
    },
  },
  {
    title: 'Action',
    key: 'x',
  },
];

export default function ProjectsTable() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  columns[3].render = (text, record) => (
    <Space size='middle'>
      {/* eslint-disable-next-line */}
      <a>Edit</a>
      {/* eslint-disable-next-line */}
      <a onClick={() => deleteThisProject(record)}>Delete</a>
    </Space>
  );

  const deleteThisProject = async (project) => {
    await deleteProject(project.id, project.groupId);
    getData();
  };

  const getData = async () => {
    const projects = await getAllProjects();
    setProjects(projects.map((project) => ({ ...project, key: project.id })));
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card style={{ backgroundColor: '#F7F7F7', height: '100%' }}>
      <Space
        align='baseline'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: 'center',
          }}
        >
          Projects
        </Title>
        <CreateProject getData={getData} />
      </Space>
      <Table
        loading={loading}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
        dataSource={projects}
        bordered
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={{ y: 200 }}
      />
    </Card>
  );
}
