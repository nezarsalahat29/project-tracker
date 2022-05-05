import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { getStudentFromDb } from '../firestore';
import Loader from './Loader';

const { Title } = Typography;

export default function Student({ studentId }) {
    const [student, setStudent] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStudent = async () => {
            setStudent(await getStudentFromDb(studentId));
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
            }}
        >
            {loading ? <Loader /> : student.name}
        </Title>
    );
}
