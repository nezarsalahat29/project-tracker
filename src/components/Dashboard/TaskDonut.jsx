import React from 'react';
import { Pie } from '@ant-design/plots';
import { Card } from 'antd';
import { Divider } from 'antd';

import { Typography } from 'antd';

const { Title } = Typography;

export default function TaskDonut() {
    const data = [
        {
            type: 'Assigned',
            value: 42,
        },
        {
            type: 'Working on',
            value: 30,
        },

        {
            type: 'Finished',
            value: 18,
        },
    ];
    const config = {
        appendPadding: 30,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: '',
            },
        },
    };

    return (
        <Card style={{ backgroundColor: '#F7F7F7', height: '100%' }}>
            <Title level={2}>Tasks summary</Title>
            <Divider />
            <Pie {...config} />
        </Card>
    );
}
