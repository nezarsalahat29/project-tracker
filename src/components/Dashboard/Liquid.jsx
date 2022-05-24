import React from "react";
import { Card } from "antd";
import { Liquid } from "@ant-design/plots";
import { Divider } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

const dataProject = {
  name: "project",
  tasklist: [
    { name: "task 1", status: "To-Do" },
    { name: "task 2", status: "in-progress" },
    { name: "task 3", status: "Done" },
  ],
};

function GetCount(tasklist) {
  let c = 0;
  let dc = 0;
  tasklist.forEach((element) => {
    c = c + 1;
    if (element.status === "Done") dc = dc + 1;
  });
  return { c, dc };
}
export default function LiquidPlot() {
  let { c, dc } = GetCount(dataProject.tasklist);
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
