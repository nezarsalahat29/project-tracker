import React from 'react';
import { Pie } from '@ant-design/plots';
import { Card } from 'antd';
import { Divider } from 'antd';

import { Typography } from 'antd';

const { Title } = Typography;

export default function TaskDonut() {
	const dummydata = [
		{ status: 'Assigned' },
		{ status: 'Working on' },
		{ status: 'Assigned' },
		{ status: 'Working on' },
		{ status: 'Assigned' },
		{ status: 'Finished' },
		{ status: 'Working on' },
		{ status: 'Working on' },
		{ status: 'Assigned' },
		{ status: 'Finished' },
		{ status: 'Finished' },
	];
	var assigned = 0;
	var workingon = 0;
	var finished = 0;
	for (var i = 0; i < dummydata.length; i++) {
		dummydata[i]['status'] == 'Assigned'
			? assigned++
			: dummydata[i]['status'] == 'Working on'
			? workingon++
			: finished++;
	}
	var total = assigned + workingon + finished;
	const data = [
		{
			type: 'Assigned',
			value: Number(((assigned / total) * 100).toFixed(2)),
		},
		{
			type: 'Working on',
			value: Number(((workingon / total) * 100).toFixed(2)),
		},

		{
			type: 'Finished',
			value: Number(((finished / total) * 100).toFixed(2)),
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
