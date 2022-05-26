import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { Card } from "antd";
import { Divider } from "antd";
import { getProject } from "../../firestore/projects";
import { useAuth } from "../../contexts/AuthContext";
import { getGroupFromDb } from "../../firestore/groups";
import { Typography } from "antd";

const { Title } = Typography;
function GetCount(project) {
  var assigned = 0;
  var workingon = 0;
  var finished = 0;
  project.tasks.forEach((element) => {
    element.status === "todo"
      ? assigned++
      : element.status === "doing"
      ? workingon++
      : finished++;
  });
  var total = assigned + workingon + finished;
  return { assigned, workingon, finished, total };
}

export default function TaskDonut() {
  const { currentUser } = useAuth();
  const [data, setData] = useState([
    {
      type: "Assigned",
      value: 0,
    },
    {
      type: "Working on",
      value: 0,
    },

    {
      type: "Finished",
      value: 0,
    },
  ]);
  const getProjectData = async () => {
    const groups = await getGroupFromDb(currentUser.groupId);
    const projectData = await getProject(groups.projectID);
    const { assigned, workingon, finished, total } = GetCount(projectData);
    setData([
      {
        type: "Assigned",
        value: Number(((assigned / total) * 100).toFixed(2)),
      },
      {
        type: "Working on",
        value: Number(((workingon / total) * 100).toFixed(2)),
      },

      {
        type: "Finished",
        value: Number(((finished / total) * 100).toFixed(2)),
      },
    ]);
  };

  useEffect(() => {
    const getData = async () => {
      await Promise.all([getProjectData()]);
    };

    getData();
  }, []);

  const config = {
    appendPadding: 30,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "",
      },
    },
  };

  return (
    <Card style={{ backgroundColor: "#F7F7F7", height: "100%" }}>
      <Title level={2}>Tasks summary</Title>
      <Divider />
      <Pie {...config} />
    </Card>
  );
}
