import React from "react";
import Inbox from "../../components/Inbox";
import LastModifiedTable from "../../components/LastModifiedTable";
import StatisticsBar from "../../components/Statistics";
import TimelineComponent from "../../components/Timeline";

function Dashboard() {
  return (
    <div>
      <StatisticsBar />
      <TimelineComponent />
      <LastModifiedTable />
      <Inbox />
    </div>
  );
}

export default Dashboard;
