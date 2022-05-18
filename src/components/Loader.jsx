import React from 'react';
import { Space, Spin } from 'antd';

export default function Loader() {
    return (
        <Space
            size='large'
            style={{
                height: '90%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Spin size='large' />
        </Space>
    );
}
