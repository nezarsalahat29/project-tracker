import React from 'react';
import Inbox from '../../components/Dashboard/Inbox';
import LastModifiedTable from '../../components/Dashboard/LastModifiedTable';
import StatisticsBar from '../../components/Dashboard/Statistics';
import TimelineComponent from '../../components/Dashboard/Timeline';
import TaskDonut from '../../components/Dashboard/TaskDonut';
import LiquidPlot from '../../components/Dashboard/Liquid';
import { useAuth } from '../../contexts/AuthContext';
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

function Dashboard() {
	const { currentUser } = useAuth();
	const items = currentUser.instructor
		? instructorDashboard
		: instructorDashboard;

	return <div>{items}</div>;
}

export default Dashboard;
