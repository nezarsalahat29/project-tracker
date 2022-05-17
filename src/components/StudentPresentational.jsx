import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function StudentPresentational({ student }) {
    return (
        <Title
            level={5}
            style={{
                margin: '0.5rem',
                padding: '0.5rem',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                backgroundColor: 'rgba(240, 240, 240)',
                textAlign: 'center',
                display: 'inline-block',
                width: '160px',
            }}
        >
            {student.name}
        </Title>
    );
}
