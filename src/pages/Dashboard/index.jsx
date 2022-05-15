
import React, { useEffect } from 'react';
import Inbox from '../../components/Dashboard/Inbox';
import LastModifiedTable from '../../components/Dashboard/LastModifiedTable';
import StatisticsBar from '../../components/Dashboard/Statistics';
import TimelineComponent from '../../components/Dashboard/Timeline';
import TaskDonut from '../../components/Dashboard/TaskDonut';
import LiquidPlot from '../../components/Dashboard/Liquid';
import { useAuth } from '../../contexts/AuthContext';
import { Row, Col } from 'antd';

const instructorDashboard = (
    <Row gutter={[16, 24]}>
        <Col xs={24}>
            <StatisticsBar />
        </Col>
        <Col xs={24} sm={12}>
            <Inbox />
        </Col>
        <Col xs={24} sm={12}>
            <TimelineComponent />
        </Col>
        <Col xs={24}>
            <LastModifiedTable />
        </Col>
    </Row>
);
const studentDashboard = (
    <Row gutter={[16, 24]}>
        <Col xs={24} sm={12}>
            <TimelineComponent />
        </Col>
        <Col xs={24} sm={12}>
            <Inbox />
        </Col>
        <Col xs={24} sm={12}>
            <TaskDonut />
        </Col>
        <Col xs={24} sm={12}>
            <LiquidPlot />
        </Col>
    </Row>
);



export default function Dashboard() {

    const { currentUser } = useAuth();

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return currentUser.instructor ? instructorDashboard : studentDashboard;
}
