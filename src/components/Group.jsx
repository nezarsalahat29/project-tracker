import React, { Children, useEffect, useState } from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Droppable from './Droppable';
import { getUserDocument } from '../firestore';
import Loader from './Loader';
import Student from './Student';
import Draggable from './Draggable';
import StudentPresentational from './StudentPresentational';

export default function Group({ group, deleteGroup }) {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStudents = async () => {
            group.studentIds.forEach(async (studentId) => {
                const student = await getUserDocument(studentId);
                setStudents((students) => [...students, student]);
            });

            setLoading(false);
        };

        getStudents();
    }, []);

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
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* <div
                    style={{
                        color: 'rgba(0, 0, 0, 0.4)',
                        textAlign: 'center',
                    }}
                >
                    {' '}
                    drop here{' '}
                </div> */}
                    {students.map((student) => (
                        <Draggable
                            id={`draggable${student.id}`}
                            key={student.id}
                        >
                            <StudentPresentational
                                key={student.id}
                                student={student}
                            />
                        </Draggable>
                    ))}
                </div>
            </Droppable>
        </Card>
    );
}
