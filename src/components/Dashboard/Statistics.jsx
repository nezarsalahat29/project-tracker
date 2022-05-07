import React from "react";
import { Bar } from "@ant-design/plots";
import { Card } from "antd";
import { Divider } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

export default function StatisticsBar() {
  const data = [
    {
      State: "In Progress",
      Group: "Group-1",
      value: 502,
    },
    {
      State: "In Progress",
      Group: "Group-2",
      value: 635,
    },
    {
      State: "In Progress",
      Group: "Group-3",
      value: 809,
    },
    {
      State: "In Progress",
      Group: "Group-4",
      value: 947,
    },
    {
      State: "In Progress",
      Group: "Group-5",
      value: 1402,
    },
    {
      State: "In Progress",
      Group: "Group-6",
      value: 3634,
    },
    {
      State: "In Progress",
      Group: "Group-7",
      value: 5268,
    },
    {
      State: "Remaining",
      Group: "Group-1",
      value: 106,
    },
    {
      State: "Remaining",
      Group: "Group-2",
      value: 107,
    },
    {
      State: "Remaining",
      Group: "Group-3",
      value: 111,
    },
    {
      State: "Remaining",
      Group: "Group-4",
      value: 133,
    },
    {
      State: "Remaining",
      Group: "Group-5",
      value: 221,
    },
    {
      State: "Remaining",
      Group: "Group-6",
      value: 767,
    },
    {
      State: "Remaining",
      Group: "Group-7",
      value: 1766,
    },
    {
      State: "Done",
      Group: "Group-1",
      value: 163,
    },
    {
      State: "Done",
      Group: "Group-2",
      value: 203,
    },
    {
      State: "Done",
      Group: "Group-3",
      value: 276,
    },
    {
      State: "Done",
      Group: "Group-4",
      value: 408,
    },
    {
      State: "Done",
      Group: "Group-5",
      value: 547,
    },
    {
      State: "Done",
      Group: "Group-6",
      value: 729,
    },
    {
      State: "Done",
      Group: "Group-7",
      value: 628,
    },
  ];
  const config = {
    data,
    xField: "value",
    yField: "Group",
    seriesField: "State",
    isPercent: true,
    isStack: true,

    /** 自定义颜色 */
    // color: ['#2582a1', '#f88c24', '#c52125', '#87f4d0'],
    label: {
      position: "middle",
      content: (item) => {
        return item.value.toFixed(2);
      },
      style: {
        fill: "#fff",
      },
    },
  };
  return (
    <div>
      <Card style={{ backgroundColor: "#F7F7F7" }}>
        <Title level={2}>Group Statistics</Title> <Divider />
        <Bar {...config} />
      </Card>
    </div>
  );
}

//ReactDOM.render(<StatisticsBar />, document.getElementById('container'));
