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



import { Alert } from "antd";


import { Divider } from "antd";


import AssignProject from "../../components/Project/AssignProject";
import AddNewTask from "../../components/Project/AddNewTask";
import Bar from "../../components/Project/Bar";
import ProjectInfo from "../../components/Project/ProjectInfo";
import TasksLists from "../../components/Project/TaskList";
import { v4 as uuidv4 } from "uuid";


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
  Progress:69,
  deliverables: [
    {
      title: "Project Tracker delevierable (1)",
      id: "768375343435",
      dueDate: "16-AUG-1916",
    },
    {
      title: "Project Tracker delevierable (2)",
      id: "4854424545",
      dueDate: "27-MAY-2023",
    },
    {
      title: "Project Tracker delevierable (3)",
      id: "SSsf74saQE54",
      dueDate: "17-1-2043",
    },
  ],
};
export const GroupData = [
  { id: 133050, title: "Jebril" },
  { id: 133051, title: "Nezar" },
  { id: 133052, title: "Hedaya" },
  { id: 133053, title: "Mohannad" },
];

export default function Project() {
  <Alert message="Informational Notes" type="info" showIcon />;
  
  uuidv4(); 

  const items = [
  { id: uuidv4(), Title: "First Task", content: "The First task description" },
  {
    id: uuidv4(),
    Title: "Second Task",
    content: "The Second task description",

  },
  { id: uuidv4(), Title: "Third Task", content: "The Third task description" },
  {
    id: uuidv4(),
    Title: "Fourth Task",
    content: "The Fourth task description",
  },
];

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

      <TasksLists tasks={items} projectId={"Hp1pG6QCkzYn8h043QPE"} />
      <AddNewTask />
    </>
  );
}
