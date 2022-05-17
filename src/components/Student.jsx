import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { getUserDocument } from '../firestore';
import Loader from './Loader';

const { Title } = Typography;

export default function Student({ studentId }) {
    const [student, setStudent] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStudent = async () => {
            setStudent(await getUserDocument(studentId));
            setLoading(false);
        };
        getStudent();
    }, []);

    return (
        <Title
            level={5}
            style={{
                margin: '0.5rem',
                padding: '0.5rem',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                cursor: 'grab',
                backgroundColor: 'rgba(240, 240, 240)',
            }}
        >
            {loading ? <Loader /> : student.name}
        </Title>
    );
}
