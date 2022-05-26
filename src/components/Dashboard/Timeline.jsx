import React, { useEffect, useState } from "react";
import { Card, Timeline } from "antd";
import { Divider } from "antd";
import { Typography } from "antd";
import { getProject, getAllProjects } from "../../firestore/projects";
import { useAuth } from "../../contexts/AuthContext";
import { getGroupFromDb } from "../../firestore/groups";
const { Title } = Typography;
let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];
function join(t, a, s) {
  function format(m) {
    let f = new Intl.DateTimeFormat("en", m);
    return f.format(t);
  }
  return a.map(format).join(s);
}
function getData(projects) {
  var data = {};
  projects.forEach((element) => {
    element.tasks.forEach((task) => {
      data[Math.floor(task.dueDate.seconds / (3600 * 24))] = data[
        Math.floor(task.dueDate.seconds / (3600 * 24))
      ]
        ? [
            ...data[Math.floor(task.dueDate.seconds / (3600 * 24))],
            "Task: " + task.title,
          ]
        : ["Task: " + task.title];
    });
    element.deliverables.forEach((deliverable) => {
      data[Math.floor(deliverable.dueDate.seconds / (3600 * 24))] = data[
        Math.floor(deliverable.dueDate.seconds / (3600 * 24))
      ]
        ? [
            ...data[Math.floor(deliverable.dueDate.seconds / (3600 * 24))],
            "Deliverable: " + deliverable.title,
          ]
        : ["Deliverable: " + deliverable.title];
    });
  });
  return data;
}

function TimelineComponent() {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);

  const getProjectData = async () => {
    var dataFetched = [];
    const groups = await getGroupFromDb(currentUser.groupId);
    const projectData = currentUser.instructor
      ? await getAllProjects()
      : [await getProject(groups.projectID)];
    const d = getData(projectData);
    for (const property in d) {
      dataFetched.push([
        join(new Date(property * (3600 * 24) * 1000), a, "-"),
        [...d[property]],
      ]);
    }
    setData(dataFetched);
  };

  useEffect(() => {
    const getData = async () => {
      await Promise.all([getProjectData()]);
    };

    getData();
  }, []);

  return (
    <Card style={{ backgroundColor: "#F7F7F7", height: "100%" }}>
      <Title level={2}>TimeLine</Title>
      <Divider />
      <Timeline>
        {data &&
          data.map((item) => {
            return (
              <Timeline.Item>
                <p>{item[0]}</p>
                {item[1].map((item2) => (
                  <p>{item2}</p>
                ))}
              </Timeline.Item>
            );
          })}
      </Timeline>
    </Card>
  );
}
export default TimelineComponent;
