import React, { useEffect, useState } from "react";
import { Bar } from "@ant-design/plots";
import { Card } from "antd";
import { Divider } from "antd";
import { Typography } from "antd";
import { getAllProjects } from "../../firestore/projects";

const { Title } = Typography;

function GetCount(taskList) {
  let todoCount = 0;
  let doneCount = 0;
  let inProgressCount = 0;
  taskList.forEach((element) => {
    if (element.status === "todo") todoCount = todoCount + 1;
    else if (element.status === "doing") inProgressCount = inProgressCount + 1;
    else doneCount = doneCount + 1;
  });
  console.log(todoCount, doneCount, inProgressCount);
  return { todoCount, doneCount, inProgressCount };
}

export default function StatisticsBar() {
  const [project, setProject] = useState([]);
  const [data] = useState([]);
  const getProjectData = async () => {
    const projectData = await getAllProjects();
    setProject(projectData);
  };

  useEffect(() => {
    const getData = async () => {
      await Promise.all([getProjectData()]);
    };

    getData();
  }, []);

  project.forEach((element) => {
    const { todoCount, doneCount, inProgressCount } = GetCount(element.tasks);
    const group = element.groupId;
    data.push(
      {
        State: "In Progress",
        Group: group,
        value: inProgressCount,
      },
      {
        State: "To Do",
        Group: group,
        value: todoCount,
      },
      {
        State: "Done",
        Group: group,
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
