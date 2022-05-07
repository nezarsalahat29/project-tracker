import React, { useEffect, useState } from 'react';
import { Row, Col, Space, Typography, Divider, Button } from 'antd';
import Student from '../../components/Student';
import StudentPresentational from '../../components/StudentPresentational';
import Group from '../../components/Group';
import Loader from '../../components/Loader';
import {
    getGroupsFromDb,
    getStudentsFromDb,
    createGroup,
    deleteGroup,
    getUserDocument,
    getGroupFromDb,
    updateUser,
    updateGroup,
} from '../../firestore';

// Dnd
import { DndContext, DragOverlay } from '@dnd-kit/core';
import Droppable from '../../components/Droppable';
import Draggable from '../../components/Draggable';

const { Title } = Typography;
export default function Class() {
    const [students, setStudents] = useState([]);
    const [studentLoading, setStudentLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const [groupLoading, setGroupLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [draggingStudent, setDraggingStudent] = useState();

    const getStudentsData = async () => {
        let students = await getStudentsFromDb();
        students = students.filter((student) => !student.groupId);
        setStudents(students);
        setStudentLoading(false);
    };

    const getGroupData = async () => {
        setGroups(await getGroupsFromDb());
        setGroupLoading(false);
    };

    const getData = async () => {
        await Promise.all([getStudentsData(), getGroupData()]);
    };

    useEffect(() => {
        getData();
    }, []);

    const createNewGroup = async () => {
        createGroup({});
        getGroupData();
    };

    const deleteThisGroup = (group) => {
        group.studentIds.forEach(async (studentId) => {
            await updateUser(studentId, { groupId: null });
        });
        deleteGroup(group.id);
        getData();
    };

    const handleDragStart = async (event) => {
        console.log('starting drag');
        const studentId = event.active.id.substring(9);
        const student = await getUserDocument(studentId);
        console.log('draggingStudent: ', student);
        setDraggingStudent(<StudentPresentational student={student} />);
        event.active.data.current = student;
        console.log('dragging event on start: ', event);
        setIsDragging(true);
    };

    const handleDragEnd = async (event) => {
        setIsDragging(false);
        if (event.over && /^droppableStudent$/.test(event.over.id)) {
            const studentId = event.active.id.substring(9);
            console.log('student:', studentId);
            const student = event.active.data.current;
            if (student.groupId) {
                // setStudentLoading(true);
                // setGroupLoading(true);
                setStudents((students) => [...students, student]);
                const studentGroup = await getGroupFromDb(student.groupId);
                updateUser(studentId, {
                    ...student,
                    groupId: null,
                    lastModified: new Date(),
                });
                updateGroup(studentGroup.id, {
                    ...studentGroup,
                    studentIds: studentGroup.studentIds.filter(
                        (id) => id !== studentId
                    ),
                });
                getData();
            }
        } else if (event.over && /^droppable/.test(event.over.id)) {
            // setStudentLoading(true);
            // setGroupLoading(true);

            const groupId = event.over.id.substring(9);
            const studentId = event.active.id.substring(9);
            console.log('group: ', groupId);
            console.log('student: ', studentId);

            const student = await getUserDocument(studentId);
            console.log(student);
            if (student.groupId !== groupId) {
                if (student.groupId) {
                    const oldStudentGroup = await getGroupFromDb(
                        student.groupId
                    );
                    updateGroup(student.groupId, {
                        studentIds: oldStudentGroup.studentIds.filter(
                            (sId) => sId !== studentId
                        ),
                        lastModified: new Date(),
                    });
                }

                updateUser(studentId, {
                    groupId: groupId,
                    lastModified: new Date(),
                });

                const newStudentGroup = await getGroupFromDb(groupId);
                updateGroup(groupId, {
                    studentIds: [...newStudentGroup.studentIds, studentId],
                    lastModified: new Date(),
                });
            }

            getData();
        }
    };

    return (
        <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ height: '100%' }}
            wrap={false}
        >
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <Col
                    flex='250px'
                    style={{
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
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
                    <DragOverlay>
                        {isDragging ? draggingStudent : null}
                    </DragOverlay>
                    <Droppable id={`droppableStudent`}>
                        {studentLoading ? (
                            <Loader />
                        ) : (
                            students.map((student) => (
                                <Draggable
                                    id={`draggable${student.id}`}
                                    key={student.id}
                                >
                                    <StudentPresentational student={student} />
                                </Draggable>
                            ))
                        )}
                    </Droppable>
                </Col>
                <Col
                    flex='auto'
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
