//urgent/necessery edits:
//anything came from old dashboard needs to be deleted.
//export and return should be fixed so navbar can navigate to project page & project page renders properly

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
/****************************************************************/

/*function LiquidP() {
  const config = {
    percent: 0.7,
    outline: {
      distance: 8,
    },
    wave: {
      length: 130,
    },
  };
  return (
    <div style={{ width: 300, height: 300 }}>
      <Liquid {...config} />
    </div>
  );
}*/

export default function Project() {
  const data = [
    { id: 133050, title: "Jebril" },
    { id: 133051, title: "Nezar" },
    { id: 133052, title: "Hedaya" },
    { id: 133053, title: "Mohannad" },
  ];

  <Alert message="Informational Notes" type="info" showIcon />;

  const Projects = {
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
    Progress: 0.75,
    deliverables: [{
      title:"Project Tracker delevierable (1)",
      id:"768375343435",
      dueDate:"16-AUG-1916"},
      {title:"Project Tracker delevierable (2)",
      id:"4854424545",
      dueDate:"27-MAY-2023"},
      {
      title:"Project Tracker delevierable (3)",
      id:"SSsf74saQE54",
      dueDate:"17-1-2043"

  }],
  };
  return (
    <>
      <div>
        <h1>{Projects.Title}</h1>
        <br />
      </div>

      <Row
        gutter={8}
        style={{
          marginTop: "50px",
        }}
      >
        <Col span={12} style={{ padding: "50px" }}>
          <h1>Project ID: {Projects.id}</h1>
          <h3 className="Description">From:{Projects.startDate}</h3>
          <h3 className="Description">To:{Projects.endDAte}</h3>
          <div className="Description">{Projects.description}</div>
        </Col>

        <Col span={12} style={{ padding: "50px", marginTop: "85px" }}>
          <Alert
            message="Warning"
            description="No group is assigned to this project yet!"
            type="info"
            showIcon
          />
          <Collaps items={data} icon={<TeamOutlined />} head="Group1" />
          <Collaps
            items={Projects.deliverables}
            icon={<FileTextOutlined />}
            head="Deliverables"
          />
        </Col>
      </Row>

      <AssignProject />
      <div style={{ textAlign: "center" }}>
        <h2>Work progres:</h2>
        <div style={{ textAlign: "center", position: "relative", left: 110 }}>
          <Row gutter={6}>
            <Progress
              style={{
                width: "90%",

                marginBottom: "25px",
              }}
              strokeColor={{
                "0%": "#5ebcff",
                "100%": "#162b3b",
              }}
              trailColor="#c9c8c5"
              percent={75}
            />
          </Row>
        </div>
      </div>

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
