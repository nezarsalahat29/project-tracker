import React, { useEffect, useState } from 'react';
import { Row, Col, Space, Typography, Divider, Button, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import StudentPresentational from '../../components/StudentPresentational';
import Group from '../../components/Group';
import Loader from '../../components/Loader';
import {
  getGroupsFromDb,
  getStudentsFromDb,
  createGroup,
  deleteGroup,
  getUserDocument,
  getGroupFromDb,
  updateUser,
  updateGroup,
} from '../../firestore';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const { Title } = Typography;
export default function Class() {
  const [students, setStudents] = useState([]);
  const [studentLoading, setStudentLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [groupLoading, setGroupLoading] = useState(true);

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

  const getData = async () => {
    await Promise.all([getStudentsData(), getGroupData()]);
  };

  useEffect(() => {
    getData();
  }, []);

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column =
        source.droppableId === 'studentsDroppable'
          ? students
          : groups.find((g) => g.id === destination.droppableId).students;

      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      if (source.droppableId === 'studentsDroppable') {
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
        source.droppableId === 'studentsDroppable'
          ? students
          : groups.find((g) => g.id === source.droppableId).students;

      const destinationColumn =
        destination.droppableId === 'studentsDroppable'
          ? students
          : groups.find((g) => g.id === destination.droppableId).students;

      const sourceItems = [...sourceColumn];
      const destinationItems = [...destinationColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);

      console.log(destinationItems);

      if (source.droppableId === 'studentsDroppable') {
        setStudents(sourceItems);
        setGroups(
          groups.map((group) => {
            if (group.id === destination.droppableId) {
              return { ...group, students: destinationItems };
            }
            return group;
          })
        );
      } else {
        if (destination.droppableId === 'studentsDroppable') {
          setStudents(destinationItems);
        }
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
      }
    }
  };

  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      style={{ height: '100%' }}
      wrap={false}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Col
          flex='220px'
          style={{
            // border: '1px solid rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Space
            align='baseline'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Title
              level={2}
              style={{
                width: '100%',
                textAlign: 'center',
                marginBottom: '0',
              }}
            >
              Students
            </Title>
          </Space>
          <Divider style={{ margin: '12px 0' }} />

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
                      ? 'lightblue'
                      : '#f0f2f5',
                    borderRadius: '10px',

                    padding: 4,
                    width: '100%',
                    minHeight: 100,
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
                            userSelect: 'none',
                            padding: '0.5rem',
                            margin: '0.5rem',
                            background: snapshot.isDragging
                              ? '#3867cb'
                              : '#4da6d1',
                            color: 'white',
                            textAlign: 'center',
                            width: '160px',
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
              display: 'flex',
              justifyContent: 'space-between',
              // alignItems: 'center',
            }}
          >
            <Title level={2} style={{ marginBottom: '0' }}>
              Groups
            </Title>
            <Button type='primary' onClick={() => {}}>
              Create Group
            </Button>
          </Space>
          <Divider style={{ margin: '12px 0' }} />

          {groupLoading ? (
            <Loader />
          ) : (
            groups.map((group) => (
              <Card
                key={group.id}
                title={`Group ${group.id}`}
                extra={
                  // eslint-disable-next-line
                  <a onClick={() => {}}>
                    <DeleteOutlined />
                  </a>
                }
                style={{
                  width: '100%',
                  marginBottom: '0.5rem',
                }}
              >
                <Droppable key={group.id} droppableId={group.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? 'lightblue'
                          : '#f0f2f5',
                        borderRadius: '10px',
                        padding: 4,
                        width: '100%',
                        minHeight: 100,
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
                                userSelect: 'none',
                                padding: '0.5rem',
                                margin: '0.5rem',
                                background: snapshot.isDragging
                                  ? '#3867cb'
                                  : '#4da6d1',
                                color: 'white',
                                display: 'inline-block',
                                width: '160px',
                                textAlign: 'center',
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
              </Card>
            ))
          )}
        </Col>
      </DragDropContext>
    </Row>
  );
}
