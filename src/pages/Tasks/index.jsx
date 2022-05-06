/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Tag, Popconfirm } from "antd";
import React, { useState } from "react";
import "./style.css";

const states = ["Assigned", "Working on", "Finished"];
const data = [
  {
    key: "1",
    taskName: "Create A Dashboard Component",

    status: "Finished",
  },
  {
    key: "2",
    taskName: "Create A Chat Component",
    status: "Working on",
  },
  {
    key: "3",
    taskName: "Create A Tasks Component",
    status: "Assigned",
  },
];

export default function Tasks() {
  const [dataSource, setDataSource] = useState(data);

  const columns = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      shouldCellUpdate: (record, prevRecord) => {
        console.log(record.name, prevRecord.name);
        return record.name !== prevRecord.name;
      },
      render: function (status) {
        console.log(status);
        let color;
        if (status === "Assigned") {
          color = "volcano";
        } else if (status === "Finished") {
          color = "green";
        } else {
          color = "geekblue";
        }

        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          {states.map(function (state) {
            return (
              <Popconfirm
                className='link'
                title={"Set to " + state + "?"}
                onConfirm={() => handle(record.key, state)}
              >
                <a class='link' href=''>
                  {state}
                </a>
              </Popconfirm>
            );
          })}
        </div>
      ),
    },
  ];

  function handle(key, state) {
    console.log(state);
    var i = dataSource.findIndex((item) => item.key === key);
    console.log(dataSource[i]);
    dataSource[i].status = state;
    setDataSource([...dataSource]);
  }

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />;
    </div>
  );
}
