import React from 'react';
import { Card } from 'antd';
import { Divider } from 'antd';
import { Typography, Space } from 'antd';
import { Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Deliverables from '../../components/Projcet/Delivrables';

const { Text, Link } = Typography;

const { Title } = Typography;
function Project() {
	const state = {
		percent: 0,
	};
	const increase = () => {
		let percent = this.state.percent + 10;
		if (percent > 100) {
			percent = 100;
		}
		this.setState({ percent });
	};
	const decline = () => {
		let percent = this.state.percent - 10;
		if (percent < 0) {
			percent = 0;
		}
		this.setState({ percent });
	};
	return (
		<div>
			<Card style={{ backgroundColor: '#F7F7F7' }}>
				<Title level={2}>Project</Title>
				<Divider />
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim rem
					eaque voluptatem, similique voluptas, eligendi ullam aspernatur itaque
					sunt ratione est voluptatibus laudantium, veritatis doloremque fugiat
					officiis debitis repellendus nostrum! Lorem ipsum dolor sit, amet
					consectetur adipisicing elit. Enim rem eaque voluptatem, similique
					voluptas, eligendi ullam aspernatur itaque sunt ratione est
					voluptatibus laudantium, veritatis doloremque fugiat officiis debitis
					repellendus nostrum!
				</p>
				<Space direction='vertical'>
					<Text strong>Due Date: 30/5/2022</Text>
				</Space>
				<Progress
					strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
					percent={59.5}
				/>
			</Card>
			<Deliverables></Deliverables>
		</div>
	);
}
export default Project;
