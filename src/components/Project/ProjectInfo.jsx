import "../../pages/Project/index.css";
import { Alert } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import GroupCollapse from "../../components/Project/GroupCollapse";
import DeliCollapse from "../../components/Project/DeliverabelsCollapse";
import { TeamOutlined } from "@ant-design/icons";
import {getGroupFromDb} from "../../firestore/groups";
import React,{ useEffect, useState }  from "react";
 function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getYear()-69;
  var month = months[a.getMonth()];
  var date = a.getDate();

  var time = date + '/ ' + month + ' /' + year ;
  return time;
}

const ProjectInfo = ({_Project}) => {
  let b =true;
  const [group, setGroup] = useState([]);
  const getData = async () => {
    const group = await getGroupFromDb(_Project.groupId);
    setGroup(group);
  };
  
  if(b){getData(); b=false;}
  
  return (
    <div>
      <div>
        <h1>{_Project.title}</h1>
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
          <h3 className="Description">From:{timeConverter(_Project.createdAt)}</h3>
          <h3 className="Description">To:{timeConverter(_Project.dueDate)}</h3>
          <div className="Description">{_Project.description}</div>
        </Col>

        <Col span={12} style={{ padding: "50px", marginTop: "85px" }}>
         
         { _Project.groupId ? <GroupCollapse items={group} icon={<TeamOutlined />} />:
         
          <Alert
            message="Warning"
            description="No group is assigned to this project yet!"
            type="info"
            showIcon
          />}
          <DeliCollapse
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
