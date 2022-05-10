import {
  Table,
  Tag,
  Space,
  Rate,
  Popover,
  Button,
  Typography,
  Drawer,
  Modal,
  Steps,
} from "antd";
import React, { useState } from "react";

const { Step } = Steps;

const content = (
  <div>
    <p>Analyze the given problem and write problem description</p>
    <p>
      <Typography strong>Due Date:</Typography> 5/12/2022
    </p>
  </div>
);
const content2 = (
  <div>
    <p>Using the analysis create Use case,class and sequence Diagrams</p>
    <p>
      <Typography strong>Due Date:</Typography> 5/12/2022
    </p>
  </div>
);
const content3 = (
  <div>
    <p>Create the UI and Build your DataBase </p>
    <p>
      <Typography strong>Due Date:</Typography> 5/12/2022
    </p>
  </div>
);
//drawer
//drawer end

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "RATE",
    dataIndex: "RATE",
    key: "RATE",
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
  },
  /*
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },*/
  {
    title: "SetStatus",
    key: "SetStatus",
    render: (text, record) => (
      <Space size='middle'>
        <a>To Start {record.Status}</a>
        <a>Working On </a>
        <a>Finish</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: (
      <Popover content={content} title='problem description'>
        <Button type='primary'>problem description</Button>
      </Popover>
    ),
    RATE: <Rate allowHalf defaultValue={0} />,
    Status: (
      <Steps size='small' current={0}>
        <Step title='To Start' />
        <Step title='Working On' />
        <Step title='Finished' />
      </Steps>
    ),
    //tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: (
      <Popover content={content2} title='Uml Diagram'>
        <Button type='primary'>Uml Diagram</Button>
      </Popover>
    ),
    RATE: <Rate allowHalf defaultValue={0} />,
    Status: (
      <Steps size='small' current={0}>
        <Step title='To Start' />
        <Step title='Working On' />
        <Step title='Finished' />
      </Steps>
    ),
    //tags: ["loser"],
  },
  {
    key: "3",
    name: (
      <Popover content={content3} title='UI and DataBase'>
        <Button type='primary'>UI and DataBase</Button>
      </Popover>
    ),
    RATE: <Rate allowHalf defaultValue={0} />,
    Status: (
      <Steps size='small' current={0}>
        <Step title='To Start' />
        <Step title='Working On' />
        <Step title='Finished' />
      </Steps>
    ),
    //tags: ["cool", "teacher"],
  },
];

export default () => <Table columns={columns} dataSource={data} />;
