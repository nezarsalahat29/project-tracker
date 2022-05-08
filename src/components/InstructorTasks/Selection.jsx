import React, { useState } from "react";
import { Select, Card } from "antd";
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

var secondChoice = [];

function Selection() {
  Data.map(function (item) {
    firstChoice.push(item.projectName);
    secondChoice.push(item.groups);
  });
  const [projects, setProjects] = useState(firstChoice);
  const [group, setGroup] = useState(secondChoice[0][0]);
  function handleProvinceChange(value) {
    console.log(value);
    setProjects(secondChoice[value - 1]);
    setGroup(secondChoice[value - 1][0]);
  }
  function onSecondCityChange(value) {
    setGroup(value);
  }

  return (
    <div>
      <Card>
        <Select
          defaultValue={firstChoice[0]}
          style={{ width: 600 }}
          onChange={handleProvinceChange}
        >
          {Data.map((province) => (
            <Option key={province.key}>{province.projectName}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 200 }}
          value={group}
          onChange={onSecondCityChange}
        >
          {projects.map((group) => (
            <Option key={group}>{group}</Option>
          ))}
        </Select>
      </Card>
    </div>
  );
}

export default Selection;
