import React from "react";
import { Card } from "antd";
import { Liquid } from "@ant-design/plots";
import { Divider } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

export default function LiquidPlot() {
  const config = {
    percent: 0.5,
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
