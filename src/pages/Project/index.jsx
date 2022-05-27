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
import { Divider } from "antd";
import { getProject } from '../../firestore/projects';
import AssignProject from "../../components/Project/AssignProject";
import AddNewTask from "../../components/Project/AddNewTask";
import Bar from "../../components/Project/Bar";
import ProjectInfo from "../../components/Project/ProjectInfo";
/****************************************************************/
const projectid="Hp1pG6QCkzYn8h043QPE";

//let projectato= await Promise.getProject(projectid);


export default function Project() {
  
  const [project, setProject] = useState({});


  

  useEffect(() => {
    window.scroll(0, 0);

    const getData = async () => {
      const project = await getProject(projectid);
      
      setProject(project);
      
    };

    getData();
  },[]);



 
  return (
    <>
     <ProjectInfo  _Project={project} />
    
      <AssignProject Project={project.id} />

      <Bar p={'0.7'} />

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
