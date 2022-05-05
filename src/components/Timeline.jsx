import React from 'react';
import { Card, Timeline } from 'antd';

function TimelineComponent() {
	return (
		<div>
			<Card style={{ backgroundColor: '#F7F7F7' }}>
				<h1>TimeLine</h1>
				<hr />
				<Timeline>
					<Timeline.Item>Create a Requirement File 2022-01-15</Timeline.Item>
					<Timeline.Item>Create a Design File 2022-02-07</Timeline.Item>
					<Timeline.Item>
						<p>Design the database</p>
						<p>Design the user interface 2022-05-15</p>
					</Timeline.Item>
					<Timeline.Item>
						Deliver the full web application 2022-06-30
					</Timeline.Item>
				</Timeline>
			</Card>
		</div>
	);
}
export default TimelineComponent;
