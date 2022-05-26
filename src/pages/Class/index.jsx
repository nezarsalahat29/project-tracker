import React, { useEffect, useState } from "react";
import { Row, Col, Space, Typography, Divider, Button, Collapse } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import Loader from "../../components/Loader";
import { getStudentsFromDb, updateUser } from "../../firestore/users";
import {
  getGroupsFromDb,
  createGroup,
  deleteGroup,
  updateGroup,
} from "../../firestore/groups";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Modal } from "antd";
import AssignStudent from "../../components/AssignStudent";
const { Title } = Typography;
const { Panel } = Collapse;

export default function Class() {
  const [students, setStudents] = useState([]);
  const [studentLoading, setStudentLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [groupLoading, setGroupLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [Roles, setRoles] = useState([
    {
      name: "Leader",
    },
    {
      name: "TimeKeeper",
    },
    {
      name: "Integrator",
    },
    {
      name: "Designer",
    },
    {
      name: "Author",
    },
  ]);
  const setRolesForAll = (data) => {
    setRoles(data);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getStudentsData = async () => {
    let students = await getStudentsFromDb();
    students = students.filter((student) => !student.groupId);
    setStudents(students);
    setStudentLoading(false);
  };

  const getGroupData = async () => {
    const groups = await getGroupsFromDb();
    setGroups(groups);
    setGroupLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      await Promise.all([getStudentsData(), getGroupData()]);
    };

    getData();
  }, [Roles]);

  const createNewGroup = () => {
    createGroup({});
    getGroupData();
  };

  const deleteThisGroup = (group) => {
    setStudents((students) => [...students, ...group.students]);
    setGroups((groups) => [...groups.filter((g) => g.id !== group.id)]);

    deleteGroup(group.id);
    group.students.forEach((student) => {
      updateUser(student.id, {
        ...student,
        groupId: null,
        chatRooms: [
          ...student.chatRooms.filter((chatRoom) => chatRoom !== group.id),
        ],
      });
    });
  };

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column =
        source.droppableId === "studentsDroppable"
          ? students
          : groups.find((g) => g.id === destination.droppableId).students;

      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      if (source.droppableId === "studentsDroppable") {
        setStudents(copiedItems);
      } else {
        setGroups(
          groups.map((group) => {
            if (group.id === source.droppableId) {
              return { ...group, students: copiedItems };
            }
            return group;
          })
        );
      }
    } else {
      const sourceColumn =
        source.droppableId === "studentsDroppable"
          ? students
          : groups.find((g) => g.id === source.droppableId).students;

      const destinationColumn =
        destination.droppableId === "studentsDroppable"
          ? students
          : groups.find((g) => g.id === destination.droppableId).students;

      const sourceItems = [...sourceColumn];
      const destinationItems = [...destinationColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);

      console.log(destinationItems);

      if (source.droppableId === "studentsDroppable") {
        setStudents(sourceItems);
        setGroups(
          groups.map((group) => {
            if (group.id === destination.droppableId) {
              return { ...group, students: destinationItems };
            }
            return group;
          })
        );

        updateUser(removed.id, {
          ...removed,
          groupId: destination.droppableId,
          chatRooms: [...removed.chatRooms, destination.droppableId],
        });
        updateGroup(destination.droppableId, {
          ...groups.find((group) => group.id === destination.droppableId),
          students: destinationItems,
        });
      } else if (destination.droppableId === "studentsDroppable") {
        setStudents(destinationItems);
        setGroups(
          groups.map((group) => {
            if (group.id === source.droppableId) {
              return { ...group, students: sourceItems };
            }
            return group;
          })
        );

        updateUser(removed.id, {
          ...removed,
          groupId: null,
          chatRooms: removed.chatRooms.filter(
            (chatRoom) => chatRoom !== source.droppableId
          ),
        });
        updateGroup(source.droppableId, {
          ...groups.find((group) => group.id === source.droppableId),
          students: sourceItems,
        });
      } else {
        setGroups(
          groups.map((group) => {
            if (group.id === source.droppableId) {
              return { ...group, students: sourceItems };
            } else if (group.id === destination.droppableId) {
              return { ...group, students: destinationItems };
            }
            return group;
          })
        );

        updateGroup(source.droppableId, {
          ...groups.find((group) => group.id === source.droppableId),
          students: sourceItems,
        });

        updateGroup(destination.droppableId, {
          ...groups.find((group) => group.id === destination.droppableId),
          students: destinationItems,
        });

        updateUser(removed.id, {
          ...removed,
          groupId: destination.droppableId,
          chatRooms: [
            ...removed.chatRooms.filter(
              (chatRoom) => chatRoom !== source.droppableId
            ),
            destination.droppableId,
          ],
        });
      }
    }
  };

  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      style={{ height: "100%" }}
      wrap={false}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Col flex='180px'>
          <Space
            align='baseline'
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Title
              level={2}
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "0",
              }}
            >
              Students
            </Title>
          </Space>
          <Divider style={{ margin: "12px 0" }} />

          {studentLoading ? (
            <Loader />
          ) : (
            <Droppable droppableId='studentsDroppable' scrollable='true'>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? "lightblue"
                      : "#f0f2f5",
                    borderRadius: "10px",
                    padding: 4,
                    width: "100%",
                    minHeight: 100,
                    height: "90%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {students.map((student, index) => (
                    <Draggable
                      key={student.id}
                      draggableId={student.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            padding: "0.5rem",
                            margin: "0.5rem",
                            background: snapshot.isDragging
                              ? "#4a9cc2"
                              : "#5cc2f2",
                            color: "white",
                            display: "inline-block",
                            width: "120px",
                            textAlign: "center",
                            borderRadius: "5px",
                            height: "40px",
                            whiteSpace: "nowrap",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {student.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </Col>
        <Col flex='auto'>
          <Space
            align='baseline'
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={2} style={{ marginBottom: "0" }}>
              Groups
            </Title>
            <Button type='primary' onClick={createNewGroup}>
              Create Group
            </Button>
          </Space>

          {groupLoading ? (
            <>
              <Divider style={{ margin: "12px 0" }} />
              <Loader />
            </>
          ) : (
            <Collapse
              style={{
                margin: "12px 0",
                borderColor: "rgba(0, 0, 0, 0.06)",
              }}
            >
              {groups.map((group) => (
                <Panel
                  key={group.id}
                  header={`Group ${group.id}`}
                  extra={
                    // eslint-disable-next-line
                    <Space>
                      <a onClick={() => deleteThisGroup(group)}>
                        <DeleteOutlined />
                      </a>
                      <Button
                        type='primary'
                        onClick={() => {
                          setSelectedGroup(group);
                          showModal();
                        }}
                      >
                        Assign Roles
                      </Button>
                    </Space>
                  }
                  style={{
                    marginBottom: "0.5rem",
                  }}
                >
                  <Droppable
                    key={group.id}
                    droppableId={group.id}
                    direction='horizontal'
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "#f0f2f5",
                          borderRadius: "10px",
                          // padding: 4,
                          minHeight: 50,

                          display: "flex",
                        }}
                      >
                        {group.students.map((student, index) => (
                          <Draggable
                            key={student.id}
                            draggableId={student.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  padding: "0.5rem",
                                  margin: "0.5rem",
                                  background: snapshot.isDragging
                                    ? "#4a9cc2"
                                    : "#5cc2f2",
                                  color: "white",
                                  width: "120px",
                                  textAlign: "center",
                                  borderRadius: "5px",
                                  height: "40px",
                                  whiteSpace: "nowrap",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {student.name}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Panel>
              ))}
            </Collapse>
          )}

          <Modal
            title='Assigning Roles'
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {selectedGroup.students &&
              selectedGroup.students.map((student) => {
                return (
                  <AssignStudent
                    key={student.id}
                    student={student}
                    Roles={Roles}
                  ></AssignStudent>
                );
              })}
          </Modal>
        </Col>
      </DragDropContext>
    </Row>
  );
}
