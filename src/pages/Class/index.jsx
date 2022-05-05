import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Space, Typography, Divider, Button } from 'antd';
import Student from '../../components/Student';
import { getStudentsFromDb } from '../../firestore';

const { Title } = Typography;
export default function Class() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStudents = async () => {
            const students = await getStudentsFromDb();
            setStudents(students);
            setLoading(false);
        };

        getStudents();
    }, []);

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
                {loading && (
                    <Space
                        size='large'
                        style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Spin size='large' />
                    </Space>
                )}
                {students.map((student) => (
                    <Student key={student.id} student={student} />
                ))}
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
                    <Button type='primary'>Create Group</Button>
                </Space>
                <Divider style={{ margin: '12px 0' }} />
            </Col>
        </Row>
    );
}
