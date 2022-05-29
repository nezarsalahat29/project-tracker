import React, { useEffect, useState } from "react";

import { Button } from "antd";

import {
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
//import { getGroupsFromDb } from "../../firestore/groups";
//import { updateProject,getProject } from "../../firestore/projects";
import { Row, Col, Collapse, Radio } from "antd";

import { Drawer, Form, Space } from "antd";
import GroupCollapse from ".//GroupCollapse";

import { TeamOutlined } from "@ant-design/icons";

export default function AssignProject({Project},{groups}) {
  const [Groupvisible, setGroupVisible] = React.useState(false);

  const [group1, setGroup1] = useState({});

  const showGroupDrawer = () => {
    setGroupVisible(true);
  };
  
  const GrouponClose = () => {
    setGroupVisible(false);
  };

  return (
    <>
   
      <div style={{ textAlign: "right" }}>
        <Button
          type="primary"
          onClick={showGroupDrawer}
          size="large"
          style={{
            backgroundColor: "0092ff",
            borderColor: "#0092ff",
            borderRadius: "500",
            marginTop: "20px",
            size: "20px",
          }}
          icon={
            <UsergroupAddOutlined
              style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
            />
          }
        >
          Assign Project To Group
        </Button>
      </div>

      <Drawer
        title="Assign Project To Group "
        width={720}
        onClose={GrouponClose}
        visible={Groupvisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={GrouponClose}>Cancel</Button>
            <Button onClick={GrouponClose} type="primary">
              Assign
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark style={{ paddingLeft: 70 }}>
          <div className="GroupLabel">
            Which Group do you want to assign to this project?:
          </div>
          <div className="RadioGroup">
            <Row gutter={12}>
              <Col span={18}>
                <Form.Item
                  name="radio-button"
                  label=" "
                  rules={[{ required: true, message: "Please pick a Group!" }]}
                >
                  <Radio.Group style={{ marginBlock: 30 }}>
                    {groups.map((group) => (
                      <Radio.Button value={"G"} key={group.id} onClick={()=>setGroup1(group)}>{"Group: " + group.id}</Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </div>
         <GroupCollapse items={group1} icon= {<TeamOutlined/>} /> 
        </Form>
      </Drawer>
    </>
  );
}
