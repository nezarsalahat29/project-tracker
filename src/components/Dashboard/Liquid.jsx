import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Liquid } from "@ant-design/plots";
import { Divider } from "antd";
import { Typography } from "antd";
import { getProject } from "../../firestore/projects";
import { useAuth } from "../../contexts/AuthContext";
import { getGroupFromDb } from "../../firestore/groups";
const { Title } = Typography;

function GetCount(taskList) {
  let c = 0;
  let dc = 0;
  if (taskList)
    taskList.forEach((element) => {
      c = c + 1;
      if (element.status === "done") dc = dc + 1;
    });
  else return { c: 0, dc: 0 };
  return { c, dc };
}
export default function LiquidPlot() {
  const { currentUser } = useAuth();
  const [project, setProject] = useState([]);

  const getProjectData = async () => {
    const groups = await getGroupFromDb(currentUser.groupId);
    const projectData = await getProject(groups.projectID);
    setProject(projectData);
    console.log(projectData);
  };

  useEffect(() => {
    const getData = async () => {
      await Promise.all([getProjectData()]);
    };

    getData();
  }, []);

  let { c, dc } = project ? GetCount(project.tasks) : { c: 0, dc: 0 };
  const config = {
    percent: dc / c,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  };
  return (
    <div>
      <Card style={{ backgroundColor: "#F7F7F7" }}>
        <Title level={2}>Group Process for the project</Title>
        <Divider />
        <Liquid {...config} />
      </Card>
    </div>
  );
}

//ReactDOM.render(<DemoLiquid />, document.getElementById('container'));
