import { Table, Tag, Popconfirm } from "antd";
import React, { useState } from "react";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    status: ["Assigned"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    status: ["Working on"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    status: ["Finished"],
  },
];

export default function Tasks() {
  const [dataSource, setDataSource] = useState(data);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
        if (status[0] === "Assigned") {
          color = "volcano";
        } else if (status[0] === "Finished") {
          color = "green";
        } else {
          color = "geekblue";
        }

        return (
          <Tag color={color} key={status[0]}>
            {status[0]}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Popconfirm
            title='Set to Assign?'
            onConfirm={() => handleAssign(record.key, "Assigned")}
          >
            <a>Assign </a>
          </Popconfirm>
          <Popconfirm
            title='Set to Working on?'
            onConfirm={() => handleAssign(record.key, "Working on")}
          >
            <a>Work on </a>
          </Popconfirm>
          <Popconfirm
            title='Set to Finished?'
            onConfirm={() => handleAssign(record.key, "Finished")}
          >
            <a>Finished </a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  function handleAssign(key, state) {
    console.log(state);
    var i = dataSource.findIndex((item) => item.key === key);
    console.log(dataSource[i]);
    dataSource[i].status[0] = state;
    setDataSource(dataSource);
  }

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />;
    </div>
  );
}
