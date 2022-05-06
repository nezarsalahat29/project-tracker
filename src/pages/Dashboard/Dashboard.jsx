import React from "react";
import Inbox from "../../components/Dashboard/Inbox";
import LastModifiedTable from "../../components/Dashboard/LastModifiedTable";
import StatisticsBar from "../../components/Dashboard/Statistics";
import TimelineComponent from "../../components/Dashboard/Timeline";
import { useAuth } from "../../contexts/AuthContext";
const instructorDashboard = [
  <StatisticsBar />,
  <TimelineComponent />,
  <LastModifiedTable />,
  <Inbox />,
];
const studentDashboard = [<TimelineComponent />, <Inbox />];

function Dashboard() {
  const { currentUser } = useAuth();
  const items = currentUser.instructor ? instructorDashboard : studentDashboard;

  return <div>{items}</div>;
}

export default Dashboard;
