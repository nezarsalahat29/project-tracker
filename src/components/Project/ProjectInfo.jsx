import "../../pages/Project/index.css";
import { Alert } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import Collaps from "../../components/Project/Collaps";
import { TeamOutlined } from "@ant-design/icons";
import Projects from "../../pages/Project";
import { data } from "../../pages/Project";
import React from "react";

const ProjectInfo = ({Data,_Project}) => {
  return (
    <div>
      <div>
        <h1>{_Project.Title}</h1>
        <br />
      </div>

      <Row
        gutter={8}
        style={{
          marginTop: "50px",
        }}
      >
        <Col span={12} style={{ padding: "50px" }}>
          <h1>Project ID: {_Project.id}</h1>
          <h3 className="Description">From:{_Project.startDate}</h3>
          <h3 className="Description">To:{_Project.endDAte}</h3>
          <div className="Description">{_Project.description}</div>
        </Col>

        <Col span={12} style={{ padding: "50px", marginTop: "85px" }}>
          <Alert
            message="Warning"
            description="No group is assigned to this project yet!"
            type="info"
            showIcon
          />
          <Collaps items={Data} icon={<TeamOutlined />} head="Group1" />
          <Collaps
            items={_Project.deliverables}
            icon={<FileTextOutlined />}
            head="Deliverables"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProjectInfo;
