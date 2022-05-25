import React from 'react';
import { Card, Timeline } from 'antd';
import { Divider } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

export default function TimelineComponent() {
	const dommydata = [
		{
			dName: 'Phase 1-Create a Requirement File',
			dueDate: '2022-02-02',
		},
		{
			dName: 'Phase 2-Create a Design UML and ER File',
			dueDate: '2022-03-14',
		},
		{
			dName: 'Phase 3-Implementation File',
			dueDate: '2022-04-3',
		},
		{
			dName: 'Phase 1-Testing File',
			dueDate: '2022-05-10',
		},
	];
	console.log(dommydata[0]['dName']);
	return (
		<Card style={{ backgroundColor: '#F7F7F7', height: '100%' }}>
			<Title level={2}>TimeLine</Title>
			<Divider />
			<Timeline>
				<Timeline.Item>
					{dommydata[0]['dueDate']},{dommydata[0]['dName']}
				</Timeline.Item>
				<Timeline.Item>
					{dommydata[1]['dueDate']},{dommydata[1]['dName']}
				</Timeline.Item>
				<Timeline.Item>
					<p>Design the database</p>
					<p>Design the user interface 2022-05-15</p>
				</Timeline.Item>
				<Timeline.Item>
					Deliver the full web application 2022-06-30
				</Timeline.Item>
			</Timeline>
		</Card>
	);
}
