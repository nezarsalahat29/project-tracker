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
import Navbar from "../Navbar";
import { UsergroupAddOutlined } from "@ant-design/icons";
//import { getGroupsFromDb } from "../../firestore/groups";
//import { updateProject,getProject } from "../../firestore/projects";
import { Row, Col, Collapse, Radio } from "antd";

import { Drawer, Form, Space } from "antd";
import GroupCollapse from "../../components/Project/GroupCollapse";

import { TeamOutlined } from "@ant-design/icons";
import "./index.css";
import TasksLists from "../../components/Project/TaskList";
import { Layout,Avatar } from "antd";
//import { getProject } from '../../firestore/projects';
import AddNewTask from "../../components/Project/AddNewTask";
import Bar from "../../components/Project/Bar";
import ProjectInfo from "../../components/Project/ProjectInfo";
/****************************************************************/
//const projectid="Hp1pG6QCkzYn8h043QPE";

//let projectato= await Promise.getProject(projectid);
export let ProjectArr = {
  id: "1",
  groupId: "1",
  createdAt: " March 15, 2022, 3:09 pm",
  dueDate: " March 31, 2022, 11:59 pm",
  deliverables: [
    {
      dueDate: "March 31, 2022, 11:59 pm.",
      id: "1",
      title: "An initial requirements document",
    },
    {
      dueDate: "March 31, 2022, 11:59 pm.",
      id: "2",
      title: "An initial problem description",
    },
    {
      dueDate: "March 31, 2022, 11:59 pm.",
      id: "3",
      title: "A tentative project plan",
    },
    {
      dueDate: "March 31, 2022, 11:59 pm.",
      id: "4",
      title: "Each member role in each phase.",
    },
  ],
  description: `Project Tracker is a system that allows the instructor to track the work of a
  group of students on a specific project. At the same time students can use the system
  to manage their work and with the instructor. Suppose we have a class with enough
  number of students to be divided into two groups or more, Therefore, the instructor
  has the ability to assign each student to a specific team and give each member a
  specific role. Moreover, the instructor can create a project with required
  specifications and properties such as tasks, time, deliverables, etc. Students in the
  same team can communicate together by broadcasting a message that appears on all
  team members' side. They can also communicate with the instructor.
  At any time, students can set the status of a task as to start later on, working
  on, finished on time, finished with delay, etc. and the instructor can review the task
  and give feedback for students on the task.
  The task has a title, description, progress estimation, start date, end due date, actual
  end date, or any other suggested properties. The task can be assigned to one or
  more of the students. Group members or the instructor can put a comment on the
  task and others can reply to it.`,
  tasks: [
    {
      comments: ["niceTask", "GoodJob"],
      description: `you should discuss and share ideas,
    brain storm together,
    take notes
    and write an initial draft
    `,
      dueDate: "26/Jun/2022",
      id: "1",
      rating: "",
      resources: [
        "https://youtu.be/uO7c2tvrPj0",
        "https://youtu.be/uY4YoEO9IRw",
      ],
      status: "done",
      title: "Meeting for problem description",
    },
    {
      comments: ["niceTask", "GoodJob"],
      description: `you should discuss and share ideas,
    brain storm together,
    take notes
    and write an initial draft
    `,
      dueDate: "26/Jul/2022",
      id: "2",
      rating: "",
      resources: [
        "https://web.cse.ohio-state.edu/~bair.41/616/Project/Example_Document/Req_Doc_Example.html",
        "https://drive.google.com/drive/folders/1U7TTQ6DauoeWEOgejgJAZWBtqIeYJ5M4?usp=sharing",
      ],
      status: "todo",
      title: "Meeting for Requirements ",
    },
    {
      comments: ["niceTask", "GoodJob"],
      description: `you should discuss and share ideas,
    brain storm together,
    take notes
    and write an initial draft
    `,
      dueDate: "10/Jun/2022",
      id: "3",
      rating: "",
      resources: [
        "https://youtu.be/PxirUj9FQOg",
        "https://www.coursehero.com/file/19135592/Tentative-Project-Plan-and-Timeline/",
      ],
      status: "doing",
      title: "Meeting for Tentative project plan",
    },
  ],
  title: "Project Tracker",
};

export let GroupsArr = [
  {
    createdAt: "1/May/2022",
    id: "1",
    lastModified: "29/May/2022",
    number: "",
    projectId: "1",
    students: [
      {
        chatRooms: [],
        createdAt: "26/May/2022",
        email: "Nizar@gmail.com",
        groupId: "1",
        id: "134564",
        instructor: "",
        lastModified: "20/May/2022",
        name: "Nizar Salahat",
        role: "Doctor",
        username: "Nizar",
      },
      {
        chatRooms: [],
        createdAt: "22/May/2022",
        email: "Jebril@gmail.com",
        groupId: "1",
        id: "13155",
        instructor: "",
        lastModified: "24/May/2022",
        name: "Jebril Mejdalawi",
        role: "Leader",
        username: "Jebril",
      },
      {
        chatRooms: [],
        createdAt: "23/May/2022",
        email: "Hidayah@gmail.com",
        groupId: "1",
        id: "134521",
        instructor: "",
        lastModified: "16/May/2022",
        name: "Hidayah Jadaan",
        role: "Recorder",
        username: "Hidayah",
      },
      {
        chatRooms: [],
        createdAt: "11/May/2022",
        email: "Mohanad@gmail.com",
        groupId: "1",
        id: "141569",
        instructor: "",
        lastModified: "28/May/2022",
        name: "Mohanad Makhzoumi",
        role: "Time Keeper",
        username: "Mohanad",
      },
    ],
  },
  {
    createdAt: "5/May/2022",
    id: "2",
    lastModified: "14/May/2022",
    number: "",
    projectId: null,
    students: [
      {
        chatRooms: [],
        createdAt: "12/May/2022",
        email: "Jafar@gmail.com",
        groupId: "2",
        id: "124521",
        instructor: "",
        lastModified: "25/May/2022",
        name: "Jafar Aljuneidi",
        role: "Designer",
        username: "Jafar",
      },
    ],
  },
  {
    createdAt: "3/May/2022",
    id: "3",
    lastModified: "28/May/2022",
    number: "",
    projectId: null,
    students: [
      {
        chatRooms: [],
        createdAt: "17/May/2022",
        email: "7amo@gmail.com",
        groupId: "3",
        id: "138995",
        instructor: "",
        lastModified: "13/May/2022",
        name: "7amo Beka",
        role: "Singer",
        username: "7amo",
      },
      {
        chatRooms: [],
        createdAt: "30/May/2022",
        email: "shawkat@gmail.com",
        groupId: "3",
        id: "234512",
        instructor: "",
        lastModified: "31/May/2022",
        name: "Abu 3essam",
        role: "Alza3eem",
        username: "Shawkat",
      },
    ],
  },
];

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
  // },[]);s

  // const [Progress,setProgress]=useState();
  const { Header } = Layout;
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
       <Header
          
          style={{
            position:"relative",
            left:"44px",  
            display: 'flex',
            
            justifyContent: 'space-between',
            alignItems: 'right',
            borderBottom: '1px solid rgba(240, 240, 240)',
            width:"100%"
          }}
        >
          <Avatar
            style={{
              backgroundColor: '#1890ff',
              verticalAlign: 'middle',
            }}
            size='large'
            gap={3}
          >
            {"Team 2"}
          </Avatar>
          <Button type='primary' >
            Sign Out
          </Button>
        </Header>

        
       
      <div>
        <p>
                <h1 style={{margin:"85px" ,marginBottom:"0",fontSize:70}}>{ProjectArr.title}</h1>
       
          </p>

    
        <br />
        <hr  align="center" size="2" color="#0092ff" width="1500" style={{marginBottom:"75px"}}/>
      </div>

      <div style={{ marginRight: 137 }}>
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
              <Button
                onClick={() => {
                  GrouponClose();
                  ProjectArr.groupId = group1.id;
                }}
                type="primary"
              >
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
                    rules={[
                      { required: true, message: "Please pick a Group!" },
                    ]}
                  >
                    <Radio.Group style={{ marginBlock: 30 }}>
                      <Radio.Button
                        style={{ color: "black" }}
                        onClick={() => setGroup1({})}
                      >
                        No Group
                      </Radio.Button>
                      {GroupsArr.map((group) => (
                        <Radio.Button
                          value={"0"}
                          hoverable={false}
                          key={group.id}
                          onClick={() => setGroup1(group)}
                        >
                          {"Group: " + group.id}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <GroupCollapse items={group1} icon={<TeamOutlined /> } w={512 } />
          </Form>
        </Drawer>
      </div>
      <ProjectInfo _Project={ProjectArr} groups={GroupsArr} />
      
      <TasksLists tasks={ProjectArr.tasks} />

      <AddNewTask />
     
    </>
  );
}
