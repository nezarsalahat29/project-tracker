import React from "react";

import { Button } from "antd";

import { AppstoreAddOutlined, UsergroupAddOutlined,FileTextOutlined } from "@ant-design/icons";


import { Row, Col, Collapse, Radio } from "antd";

import { Drawer, Form, Space } from "antd";
import GroupCollapse from ".//GroupCollapse";


import { TeamOutlined } from "@ant-design/icons";

const data = [
    { id: 133050, title: "Jebril" },
    { id: 133051, title: "Nezar" },
    { id: 133052, title: "Hedaya" },
    { id: 133053, title: "Mohannad" },
  ];
  export default function AssignProject(){
    const [Groupvisible, setGroupVisible] = React.useState(false);
    const showGroupDrawer = () => {
        setGroupVisible(true);
      };
    
     
      const GrouponClose = () => {
        setGroupVisible(false);
      };
      return(
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
                  <Radio.Button value="Group 1">Group 1</Radio.Button>
                  <Radio.Button value="Group 2">Group 2</Radio.Button>
                  <Radio.Button value="Group 3">Group 3</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <GroupCollapse items={data} icon= {<TeamOutlined/>} head="Group1"/>
      </Form>
    </Drawer>
    </>
      );
  }