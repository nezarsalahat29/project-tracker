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

const { Title } = Typography;
export default function Class() {
    const [studentIds, setStudentIds] = useState([]);
    const [studentLoading, setStudentLoading] = useState(true);
    const [groupIds, setGroupIds] = useState([]);
    const [groupLoading, setGroupLoading] = useState(true);

    useEffect(() => {
        const getData = () => {
            // await Promise.all([
            //     (async () => {
            //         const ids = await getStudentsFromDb();
            //         setStudentIds(ids);
            //         setStudentLoading(false);
            //         console.log('students: ', studentIds);
            //     })(),
            //     (async () => {
            //         setGroupIds(await getGroupsFromDb());
            //         setGroupLoading(false);
            //         console.log('groups: ', groupIds);
            //     })(),
            // ]);

            return Promise.all([getStudentsFromDb(), getGroupsFromDb()]).then(
                (result) => {
                    setStudentIds(result[0]);
                    setStudentLoading(false);
                    setGroupIds(result[1]);
                    setGroupLoading(false);
                    console.log('students: ', studentIds);
                    console.log('groups: ', groupIds);
                }
            );
        };

        getData();
    }, []);

    const createNewGroup = async () => {
        setGroupLoading(true);
        createGroup({});
        setGroupIds(await getGroupsFromDb());
        setGroupLoading(false);
    };

    const deleteThisGroup = (groupId) => {
        setGroupLoading(true);
        deleteGroup(groupId);
        const newGroups = groupIds.filter((gId) => gId !== groupId);
        setGroupIds(newGroups);
        setGroupLoading(false);
    };

    return (
        <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ height: '100%' }}
        >
            <Col span={6} style={{ border: '1px solid rgba(0, 0, 0, 0.05)' }}>
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
                {studentLoading ? (
                    <Loader />
                ) : (
                    studentIds.map((studentId) => (
                        <Student key={studentId} studentId={studentId} />
                    ))
                )}
            </Col>
            <Col span={18} style={{ border: '1px solid rgba(0, 0, 0, 0.05)' }}>
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
                    groupIds.map((groupId) => (
                        <Group
                            key={groupId}
                            groupId={groupId}
                            deleteGroup={deleteThisGroup}
                        />
                    ))
                )}
            </Col>
        </Row>
    );
}
