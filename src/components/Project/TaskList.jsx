import React, { useEffect, useState } from 'react';
import { Space, Typography, Row, Col } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Loader from '../Loader';
import AddTask from './AddTask';
import { v4 as uuidv4 } from 'uuid';

const { Title } = Typography;
export default function TaskList({ tasks, projectId, getNewData }) {
  const [columns, setColumns] = useState([
    {
      id: uuidv4(),
      name: 'todo',
      tasks: [],
    },
    {
      id: uuidv4(),
      name: 'doing',
      tasks: [],
    },
    {
      id: uuidv4(),
      name: 'done',
      tasks: [],
    },
    {
      id: uuidv4(),
      name: 'delayed',
      tasks: [],
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setColumns([
      ...columns.map((column) => {
        tasks.forEach((task) => {
          if (task.status === column.name) column.tasks.push(task);
        });
        return column;
      }),
    ]);
    console.log(columns);
    setLoading(false);
  }, []);
  return (
    <>
      <Space
        align='baseline'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Title level={2} style={{ marginBottom: '0' }}>
          Tasks
        </Title>
        <AddTask
          projectId={projectId}
          otherTasks={tasks}
          getNewData={getNewData}
        />
      </Space>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 500,
        }}
      >
        <DragDropContext onDragEnd={(result) => console.log(result)}>
          {loading ? (
            <Loader />
          ) : (
            columns.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? 'lightblue'
                        : 'lightgrey',
                      padding: 4,
                      margin: 4,
                      width: 250,
                      minHeight: 500,
                    }}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: 8,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              background: snapshot.isDragging
                                ? '#263b4a'
                                : '#456c86',
                              color: 'white',
                              ...provided.draggableProps.style,
                            }}
                          >
                            {task.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))
          )}
        </DragDropContext>
      </div>
    </>
  );
}
