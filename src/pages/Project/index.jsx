// Components:  
// Project Title and info
//Warning
//Group
//Delivrables
//assignProjectTo group button and drawer
//bar
// TaskList
// Add new Task button and drawer

import React from "react";
import "./index.css";

import TasksLists from "../Tasks";

import { Alert } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

import { Divider } from "antd";

import { Row, Col } from "antd";

import Collaps from "../../components/Project/Collaps";

import { TeamOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import AssignProject from "../../components/Project/AssignProject";
import AddNewTask from "../../components/Project/AddNewTask";
import Bar from "../../components/Project/Bar";
import ProjectInfo from "../../components/Project/ProjectInfo";
/****************************************************************/

export const Projects = {
  id: 13305,
  description: `Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Curabitur tristique quam sed tristique molestie.
      Ut maximus dui et felis egestas rutrum. Praesent nec erat aliquet,
      congue eros non, imperdiet lorem. Quisque libero nisi, faucibus a
      felis eu, fermentum posuere ex. Quisque nec ex leo.`,
  startDate: "12-Jul-2022",
  endDAte: "7-Aug-2022",
  Title: "Project Tracker",
  tasks: ["task1", "task2", "task3"],
  Progress: 69,
  deliverables: [
    "Project Tracker delevierable (1)",
    "Project Tracker delevierable (1)",
    "Project Tracker delevierable (1)",
  ],
};

export const GroupData = [
  { id: 133050, title: "Jebril" },
  { id: 133051, title: "Nezar" },
  { id: 133052, title: "Hedaya" },
  { id: 133053, title: "Mohannad" },
  
]

export default function Project() {
  <Alert message="Informational Notes" type="info" showIcon />;
 
  return (
    <>
      <ProjectInfo Data={GroupData} _Project={Projects} />
      <AssignProject />

      <Bar p={Projects.Progress} />

      <Divider orientation="center"></Divider>

      <h1 style={{ textAlign: "center", fontWeight: "bold", marginTop: 75 }}>
        Tasks Lists
      </h1>
      <br />

      <TasksLists />
      <AddNewTask />
    </>
  );
}
