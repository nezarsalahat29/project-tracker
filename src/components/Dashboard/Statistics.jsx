import React from "react";
import { Bar } from "@ant-design/plots";
import { Card } from "antd";
import { Divider } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

const projectslist = [
  {
    GroupId: "Group 1",
    tasklist: [
      { name: "task 1", status: "To-Do" },
      { name: "task 2", status: "in-progress" },
      { name: "task 3", status: "Done" },
    ],
  },
  {
    GroupId: "Group 2",
    tasklist: [
      { name: "task 1", status: "To-Do" },
      { name: "task 2", status: "in-progress" },
      { name: "task 3", status: "Done" },
      { name: "task 4", status: "Done" },
    ],
  },
  {
    GroupId: "Group 3",
    tasklist: [
      { name: "task 1", status: "To-Do" },
      { name: "task 2", status: "in-progress" },
      { name: "task 3", status: "Done" },
      { name: "task 4", status: "To Do" },
    ],
  },
];

function GetCount(tasklist) {
  let todoCount = 0;
  let doneCount = 0;
  let inProgressCount = 0;
  tasklist.forEach((element) => {
    console.log(element);
    if (element.status === "Done") doneCount = doneCount + 1;
    else if (element.status === "in-progress")
      inProgressCount = inProgressCount + 1;
    else todoCount = todoCount + 1;
  });
  console.log(todoCount, doneCount, inProgressCount);
  return { todoCount, doneCount, inProgressCount };
}

export default function StatisticsBar() {
  let data = [];
  projectslist.forEach((element) => {
    const { todoCount, doneCount, inProgressCount } = GetCount(
      element.tasklist
    );

    data.push(
      {
        State: "In Progress",
        Group: element.GroupId,
        value: inProgressCount,
      },
      {
        State: "To Do",
        Group: element.GroupId,
        value: todoCount,
      },
      {
        State: "Done",
        Group: element.GroupId,
        value: doneCount,
      }
    );
  });

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
    <Card style={{ backgroundColor: "#F7F7F7", height: "100%" }}>
      <Title level={2}>Group Statistics</Title> <Divider />
      <Bar {...config} />
    </Card>
  );
}

//ReactDOM.render(<StatisticsBar />, document.getElementById('container'));
