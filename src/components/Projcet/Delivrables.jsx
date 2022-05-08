import { Collapse, Typography, Card } from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, message, Button } from "antd";

const { Panel } = Collapse;

const { Title, Text } = Typography;

function callback(key) {
  console.log(key);
}
const titles = [
  "initial requirements",
  "Uml class diagrams",
  "User Interface and Database",
];
const text1 = `
A requirements document outlines the purpose of a product or software, 
who will use it, and how it works. 
This document should be used as a starting point for all projects, 
before the design and development stages
`;
const text2 = `
The UML class diagram should have all details such as;
attribute, method, relationship, cardinality, etc. Your UML
should follow the UML standards, shapes, lines, capital and
small word, underlines, etc.
`;
const text3 = `
 User Interface :the interface should have all features that
 the system provides for all users (instructors and students) 
 Database :You have to create the database according to the
 submitted ER diagram
`;

function Deliverables() {
  return (
    <div>
      <Card style={{ backgroundColor: "#F7F7F7" }}>
        <Title level={2}>Deliverables</Title>
        <Collapse defaultActiveKey={["1"]} onChange={callback}>
          <Panel header={titles[0]} key='1'>
            <p>{text1}</p>
            <p>
              <Text strong>Due Date:</Text> 5/12/2022
            </p>
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Panel>
          <Panel header={titles[1]} key='2'>
            <p>{text2}</p>
            <p>
              <Text strong>Due Date:</Text> 5/12/2022
            </p>
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Panel>
          <Panel header={titles[2]} key='3'>
            <p>{text3}</p>
            <p>
              <Text strong>Due Date:</Text> 5/12/2022
            </p>
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
}
export default Deliverables;
