import React from "react";
import LastModifiedTable from "../../components/LastModifiedTable";
import StatisticsBar from "../../components/Statistics";
import TimelineComponent from "../../components/Timeline";

function Dashboard() {
  return (
    <div>
      <LastModifiedTable />
      <StatisticsBar />
      <TimelineComponent />
    </div>
  );
}

export default Dashboard;
