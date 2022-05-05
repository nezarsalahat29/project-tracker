import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Droppable from './Droppable';

export default function Group({ group, deleteGroup }) {
    return (
        <Card
            title={`Group ${group.id}`}
            extra={
                // eslint-disable-next-line
                <a onClick={() => deleteGroup(group.id)}>
                    <DeleteOutlined />
                </a>
            }
            style={{ width: '100%', marginBottom: '0.5rem' }}
        >
            <Droppable id={`droppable${group.id}`}>Hehe lol</Droppable>
        </Card>
    );
}
