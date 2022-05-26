// Components:
// Project Title and info
//Warning
//Group
//Delivrables
//assignProjectTo group button and drawer
//bar
// TaskList
// Add new Task button and drawer

import React, { useEffect, useState } from "react";
import "./index.css";

import TasksLists from "../../components/Project/TaskList";

import { Alert } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

import { Divider } from "antd";

import { Row, Col } from "antd";

import { getProject } from '../../firestore/projects';
import {getGroupsFromDb}from '../../firestore/groups';
import { TeamOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import AssignProject from "../../components/Project/AssignProject";
import AddNewTask from "../../components/Project/AddNewTask";
import Bar from "../../components/Project/Bar";
import ProjectInfo from "../../components/Project/ProjectInfo";
/****************************************************************/
const projectid="Hp1pG6QCkzYn8h043QPE";

//let projectato= await Promise.getProject(projectid);
export const GroupData = [
  { id: 133050, title: "Jebril" },
  { id: 133051, title: "Nezar" },
  { id: 133052, title: "Hedaya" },
  { id: 133053, title: "Mohannad" },
];
let b=(true);
export default function Project() {
  <Alert message="Informational Notes" type="info" showIcon />;
  const [projectato, setProject] = useState({});
  const [groupsato, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    const projectato = await getProject(projectid);
    const groupsato = await getGroupsFromDb();
    setProject(projectato);
    setGroups(groupsato);
    setLoading(false);
  };
  
  if(b){getData(); b=false;}
 
  return (
    <>
     <ProjectInfo Data={GroupData} _Project={projectato} />
      <AssignProject />

      <Bar p={0.7} />

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
