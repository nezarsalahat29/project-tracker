import React, { Children, useEffect, useState } from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Droppable from './Droppable';
import { getUserDocument } from '../firestore';
import Loader from './Loader';
import Student from './Student';
import Draggable from './Draggable';
import { DragOverlay } from '@dnd-kit/core';

export default function Group({ group, deleteGroup, children }) {
    console.log(children);
    return (
        <Card
            title={`Group ${group.id}`}
            extra={
                // eslint-disable-next-line
                <a onClick={() => deleteGroup(group)}>
                    <DeleteOutlined />
                </a>
            }
            style={{ width: '100%', marginBottom: '0.5rem' }}
        >
            <Droppable id={`droppable${group.id}`}>
                <div
                    style={{
                        color: 'rgba(0, 0, 0, 0.4)',
                        textAlign: 'center',
                    }}
                >
                    {' '}
                    drop here{' '}
                </div>
                {group.studentIds.map((studentId) => (
                    <Draggable id={`draggable${studentId}`} key={studentId}>
                        <Student key={studentId} studentId={studentId} />
                    </Draggable>
                ))}
            </Droppable>
        </Card>
    );
}
