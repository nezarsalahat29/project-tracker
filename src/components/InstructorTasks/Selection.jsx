import React, { useState } from "react";
import { Select, Card } from "antd";
import EditableTable from "./table2";
const { Option } = Select;

var firstChoice = ["None"];

const Data = [
  {
    key: 1,
    projectName: "Project 1",
    groups: ["Default", "Group 1", "Group 2", "Group 3"],
  },
  {
    key: 2,
    projectName: "Project 2",
    groups: ["Default", "Group 4", "Group 6", "Group 3"],
  },
  {
    key: 3,
    projectName: "Project 3",
    groups: ["Default", "Group 7", "Group 9", "Group 5"],
  },
];

var group1 = {
  groupName: "Group 1",
  Tasks: [
    {
      key: 1,
      TaskTitle: "Something",
      TaskDesc: "Something extraaaaa",
      TaskRate: "TaskRatehahaha",
    },
  ],
};
var secondChoice = [];

function Selection() {
  Data.map(function (item) {
    firstChoice.push(item.projectName);
    secondChoice.push(item.groups);
  });
  const [projects, setProjects] = useState(firstChoice);
  const [group, setGroup] = useState(secondChoice[0][0]);
  function handleProjectChange(value) {
    console.log(value);
    setProjects(secondChoice[value - 1]);
    setGroup(secondChoice[value - 1][0]);
  }
  function handleGroupChange(value) {
    setGroup(value);
  }

  return (
    <div>
      <Card>
        <Select
          defaultValue={firstChoice[0]}
          style={{ width: 600 }}
          onChange={handleProjectChange}
        >
          {Data.map((province) => (
            <Option key={province.key}>{province.projectName}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 200 }}
          value={group}
          onChange={handleGroupChange}
        >
          {projects.map((group) => (
            <Option key={group}>{group}</Option>
          ))}
        </Select>
      </Card>
      <EditableTable SelectedGroup={[...group1.Tasks]}></EditableTable>
    </div>
  );
}

export default Selection;
