import React from "react";
import { Card } from "antd";
import { Liquid } from "@ant-design/plots";

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
        <Liquid {...config} />
        <hr />
        <h1>Group Process for the project</h1>
      </Card>
    </div>
  );
}

//ReactDOM.render(<DemoLiquid />, document.getElementById('container'));
