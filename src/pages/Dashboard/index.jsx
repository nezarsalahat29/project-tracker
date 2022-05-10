import React from 'react';
import Inbox from '../../components/Dashboard/Inbox';
import LastModifiedTable from '../../components/Dashboard/LastModifiedTable';
import StatisticsBar from '../../components/Dashboard/Statistics';
import TimelineComponent from '../../components/Dashboard/Timeline';
import TaskDonut from '../../components/Dashboard/TaskDonut';
import LiquidPlot from '../../components/Dashboard/Liquid';
import { useAuth } from '../../contexts/AuthContext';
import { Row, Col } from 'antd';

const instructorDashboard = [
    <StatisticsBar />,
    <TimelineComponent />,
    <LastModifiedTable />,
    <Inbox />,
    <LiquidPlot />,
];
const studentDashboard = [
    <TimelineComponent />,
    <TaskDonut />,
    <Inbox />,
    <LiquidPlot />,
];

export default function Dashboard() {
    const { currentUser } = useAuth();
    const items = currentUser.instructor
        ? instructorDashboard
        : studentDashboard;

    return (
        <>
            <Row gutter={[16, 24]}>
                <Col xs={24}>
                    <StatisticsBar />
                </Col>
                <Col xs={24} sm={12} xl={12}>
                    <Inbox />
                </Col>
                <Col xs={24} sm={12} xl={12}>
                    <TimelineComponent />
                </Col>
                <Col xs={24}>
                    <LastModifiedTable />
                </Col>
            </Row>
        </>
    );
}
