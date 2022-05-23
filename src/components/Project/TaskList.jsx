import React from 'react';
import { Space, Typography } from 'antd';
import AddTask from './AddTask';

const { Title } = Typography;
export default function TaskList() {
  return (
    <>
      <Space
        align='baseline'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={2} style={{ marginBottom: '0' }}>
          Groups
        </Title>
        <AddTask />
      </Space>
    </>
  );
}
