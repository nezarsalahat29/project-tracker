// Components:
// Project Title and info
//Warning
//Group
//Delivrables
//assignProjectTo group button and drawer
//bar
// TaskList
// Add new Task button and drawer

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
import GroupCollapse from "../../components/Project/GroupCollapse";

import { TeamOutlined } from "@ant-design/icons";
import "./index.css";
import TasksLists from "../../components/Project/TaskList";
import { Divider } from "antd";
//import { getProject } from '../../firestore/projects';
import AssignProject from "../../components/Project/AssignProject";
import AddNewTask from "../../components/Project/AddNewTask";
import Bar from "../../components/Project/Bar";
import ProjectInfo from "../../components/Project/ProjectInfo";
/****************************************************************/
//const projectid="Hp1pG6QCkzYn8h043QPE";

//let projectato= await Promise.getProject(projectid);
export let ProjectArr  = {
  id:"1",
  groupId:"1",
  createdAt:"22/May/2022",
  deliverables:[{
    dueDate:"15/Aug/2022",
    id:"1",
    title:"Deloverable#1"
  },
  {
    dueDate:"25/Jul/2022",
    id:"2",
    title:"Deloverable#2"
  },
  {
    dueDate:"18/Jun/2022",
    id:"3",
    title:"Deloverable#3"
  },
],
  description:"This grant project description template breaks down the description into separate sections for the problem to be addressed, goals and objectives, target population, project activities, and key staff. It provides additional space for background information, measurable outcomes, and ...",
  dueDate:"25/Nov/2022",
  lastModified:"29/May/2022",
  tasks:[{
    comments:[],
    description:"this is the task#1 description you will find here the full description of this Task",
    dueDate:"26/Jun/2022",
    id:"1",
    rating:"",
    resources:[],
    status:"done",
    title:"Task#1 Title"
  },
  {
    comments:[],
    description:"this is the task#2 description you will find here the full description of this Task",
    dueDate:"26/Jul/2022",
    id:"2",
    rating:"",
    resources:[],
    status:"todo",
    title:"Task#2 Title"
  },
  {
    comments:[],
    description:"this is the task#3 description you will find here the full description of this Task",
    dueDate:"10/Jun/2022",
    id:"3",
    rating:"",
    resources:[],
    status:"doing",
    title:"Task#3 Title"
  }],
  title:"Project Tracker"
};

export let GroupsArr=[{
  createdAt:"1/May/2022",
  id:"1",
  lastModified:"29/May/2022",
  number:"",
  projectId:"1",
  students:[{
    chatRooms:[],
    createdAt:"26/May/2022",
    email:"Nizar@gmail.com",
    groupId:"1",
    id:"134564",
    instructor:"",
    lastModified:"20/May/2022",
    name:"Nizar Salahat",
    role:"Doctor",
    username:"Nizar"
  },
  {
    chatRooms:[],
    createdAt:"22/May/2022",
    email:"Jebril@gmail.com",
    groupId:"1",
    id:"13155",
    instructor:"",
    lastModified:"24/May/2022",
    name:"Jebril Mejdalawi",
    role:"Leader",
    username:"Jebril"
  },{
    chatRooms:[],
    createdAt:"23/May/2022",
    email:"Hidayah@gmail.com",
    groupId:"1",
    id:"134521",
    instructor:"",
    lastModified:"16/May/2022",
    name:"Hidayah Jadaan",
    role:"Recorder",
    username:"Hidayah"
  },
  {
    chatRooms:[],
    createdAt:"11/May/2022",
    email:"Mohanad@gmail.com",
    groupId:"1",
    id:"141569",
    instructor:"",
    lastModified:"28/May/2022",
    name:"Mohanad Makhzoumi",
    role:"Time Keeper",
    username:"Mohanad"
  }]
},{
  createdAt:"5/May/2022",
  id:"2",
  lastModified:"14/May/2022",
  number:"",
  projectId:null,
  students:[{
    chatRooms:[],
    createdAt:"12/May/2022",
    email:"Jafar@gmail.com",
    groupId:"2",
    id:"124521",
    instructor:"",
    lastModified:"25/May/2022",
    name:"Jafar Aljuneidi",
    role:"Designer",
    username:"Jafar"
  },
]
},{
  createdAt:"3/May/2022",
  id:"3",
  lastModified:"28/May/2022",
  number:"",
  projectId:null,
  students:[{
    chatRooms:[],
    createdAt:"17/May/2022",
    email:"7amo@gmail.com",
    groupId:"3",
    id:"138995",
    instructor:"",
    lastModified:"13/May/2022",
    name:"7amo Beka",
    role:"Singer",
    username:"7amo"
  },
  {
    chatRooms:[],
    createdAt:"30/May/2022",
    email:"shawkat@gmail.com",
    groupId:"3",
    id:"234512",
    instructor:"",
    lastModified:"31/May/2022",
    name:"Abu 3essam",
    role:"Alza3eem",
    username:"Shawkat"
  },]
}]

export default function Project() {
  
  // const [project, setProject] = useState({});

// setProject()

// const [Groups, setGroups] = useState([]);
// setGroups()

  // useEffect(() => {
  //   window.scroll(0, 0);

  //   const getData = async () => {
  //     const project = await getProject(projectid);
      
  //     setProject(project);
      
  //   };

  //   getData();
  // },[]);

// const [Progress,setProgress]=useState();
function ProjectProgress(){
 let DONE=0;
  let Total=0
  ProjectArr.tasks.forEach(task=> {
if(task.status === "done" || task.status === "delayed"){
  DONE+=1;
  Total+=1;
}
else{
  Total+=1
}
 });

 return (DONE/Total);
}
let TP=ProjectProgress()*100;
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
    
     
    
       
      <ProjectInfo  _Project={ProjectArr} groups={GroupsArr} />
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
            <Button onClick={()=>{GrouponClose();console.log(ProjectArr.groupId);ProjectArr.groupId=group1.id;console.log(ProjectArr.groupId);}} type="primary">
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
                    {GroupsArr.map((group) => (
                      <Radio.Button hoverable={true} key={group.id} onClick={()=>setGroup1(group)}>{"Group: " + group.id}</Radio.Button>
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
      <Bar p={TP} />

      <Divider orientation="center"></Divider>

      <h1 style={{ textAlign: "center", fontWeight: "bold", marginTop: 75 }}>
        Tasks Lists
      </h1>
      <br />

      <TasksLists tasks= {ProjectArr.tasks}/>
       


<AddNewTask />  
    </>
  );
}
