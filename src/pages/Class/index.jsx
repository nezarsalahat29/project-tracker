import React, { useEffect, useState } from 'react';
import { Row, Col, Space, Typography, Divider, Button } from 'antd';
import Student from '../../components/Student';
import Group from '../../components/Group';
import Loader from '../../components/Loader';
import {
    getGroupsFromDb,
    getStudentsFromDb,
    createGroup,
    deleteGroup,
} from '../../firestore';

// Dnd
import { DndContext } from '@dnd-kit/core';
import Droppable from '../../components/Droppable';
import Draggable from '../../components/Draggable';

const { Title } = Typography;
export default function Class() {
    const [students, setStudents] = useState([]);
    const [studentLoading, setStudentLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const [groupLoading, setGroupLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            await Promise.all([
                (async () => {
                    setStudents(await getStudentsFromDb());
                    setStudentLoading(false);
                })(),
                (async () => {
                    setGroups(await getGroupsFromDb());
                    setGroupLoading(false);
                })(),
            ]);
        };

        getData();
    }, []);

    const createNewGroup = async () => {
        setGroupLoading(true);
        createGroup({});
        setGroups(await getGroupsFromDb());
        setGroupLoading(false);
    };

    const deleteThisGroup = (groupId) => {
        setGroupLoading(true);
        deleteGroup(groupId);
        const newGroups = groups.filter((group) => group.id !== groupId);
        setGroups(newGroups);
        setGroupLoading(false);
    };

    const handleDragEnd = (event) => {
        if (event.over && /^droppableStudent$/.test(event.over.id)) {
            console.log('drop');
        } else if (event.over && /^droppable/.test(event.over.id)) {
            console.log(event.over.id.substring(9));
        }
    };

    return (
        <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ height: '100%' }}
        >
            <DndContext onDragEnd={handleDragEnd}>
                <Col
                    span={6}
                    style={{ border: '1px solid rgba(0, 0, 0, 0.05)' }}
                >
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
                            Students
                        </Title>
                    </Space>
                    <Divider style={{ margin: '12px 0' }} />
                    <Droppable id={`droppableStudent`}>
                        {studentLoading ? (
                            <Loader />
                        ) : (
                            students.map((student) => (
                                <Draggable
                                    id={`draggable${student.id}`}
                                    key={student.id}
                                >
                                    <Student student={student} />
                                </Draggable>
                            ))
                        )}
                    </Droppable>
                </Col>
                <Col
                    span={18}
                    style={{ border: '1px solid rgba(0, 0, 0, 0.05)' }}
                >
                    <Space
                        align='baseline'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            // alignItems: 'center',
                        }}
                    >
                        <Title level={2} style={{ marginBottom: '0' }}>
                            Groups
                        </Title>
                        <Button type='primary' onClick={createNewGroup}>
                            Create Group
                        </Button>
                    </Space>
                    <Divider style={{ margin: '12px 0' }} />
                    {groupLoading ? (
                        <Loader />
                    ) : (
                        groups.map((group) => (
                            <Group
                                key={group.id}
                                group={group}
                                deleteGroup={deleteThisGroup}
                            />
                        ))
                    )}
                </Col>
            </DndContext>
        </Row>
    );
}
