import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Divider } from 'antd';
import { Typography, Space } from 'antd';
import { Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Deliverables from '../../components/Projcet/Delivrables';
import ProjectTasks from '../../components/Projcet/ProjectTasks';

const { Text, Link } = Typography;

const { Title } = Typography;
function Project() {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    const increase = () => {
        let percent = percent + 10;
        if (percent > 100) {
            percent = 100;
        }
        setPercent(percent);
    };
    const decline = () => {
        let percent = percent - 10;
        if (percent < 0) {
            percent = 0;
        }
        setPercent(percent);
    };
    return (
        <div>
            <Card style={{ backgroundColor: '#F7F7F7' }}>
                <Title level={2}>Project</Title>
                <Divider />
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Enim rem eaque voluptatem, similique voluptas, eligendi
                    ullam aspernatur itaque sunt ratione est voluptatibus
                    laudantium, veritatis doloremque fugiat officiis debitis
                    repellendus nostrum! Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Enim rem eaque voluptatem, similique
                    voluptas, eligendi ullam aspernatur itaque sunt ratione est
                    voluptatibus laudantium, veritatis doloremque fugiat
                    officiis debitis repellendus nostrum!
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
            <ProjectTasks></ProjectTasks>
        </div>
    );
}
export default Project;
