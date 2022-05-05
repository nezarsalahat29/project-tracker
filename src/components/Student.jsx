import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Student({ student }) {
    return (
        <Title
            level={5}
            style={{
                margin: '0.5rem',
                padding: '0.5rem',
                border: '1px solid rgba(0, 0, 0, 0.05)',
            }}
        >
            {student.name}
        </Title>
    );
}
