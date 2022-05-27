import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Loader from '../Loader';
import AddTask from './AddTask';
import Task from './Task';
import { v4 as uuidv4 } from 'uuid';
import { updateProject } from '../../firestore/projects';

const { Title } = Typography;
export default function TaskList({
  tasks,
  projectId,
  getNewData,
  projectDueDate,
  group,
  getProgress,
}) {
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
    const getData = () => {
      setColumns((columns) =>
        columns.map((column) => {
          column.tasks = [];
          tasks.forEach((task) => {
            if (task.status === column.name) column.tasks.push(task);
          });
          return column;
        })
      );
    };

    getData();
    setLoading(false);
  }, [tasks]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = columns.find(
        (c) => c.name === destination.droppableId
      ).tasks;

      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns(
        columns.map((column) => {
          if (column.name === source.droppableId) {
            return { ...column, tasks: copiedItems };
          }
          return column;
        })
      );
    } else {
      const sourceColumn = columns.find(
        (c) => c.name === source.droppableId
      ).tasks;

      const destinationColumn = columns.find(
        (c) => c.name === destination.droppableId
      ).tasks;

      const sourceItems = [...sourceColumn];
      const destinationItems = [...destinationColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);

      tasks.forEach((task) => {
        if (task.id === removed.id) {
          task.status = destination.droppableId;
        }
      });
      updateProject(projectId, { tasks });

      setColumns(
        columns.map((column) => {
          if (column.name === source.droppableId) {
            return { ...column, tasks: sourceItems };
          } else if (column.name === destination.droppableId) {
            return { ...column, tasks: destinationItems };
          }
          return column;
        })
      );
      getProgress(columns.map((column) => column.tasks).flat());
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AddTask
          projectId={projectId}
          projectDueDate={projectDueDate}
          otherTasks={tasks}
          getNewData={getNewData}
        />
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {loading ? (
            <Loader />
          ) : (
            columns.map((column) => (
              <div key={column.name}>
                <Title level={5} style={{ textAlign: 'center' }}>
                  {column.name}
                </Title>

                <Droppable key={column.name} droppableId={column.name}>
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
                        margin: 4,
                        minWidth: 200,
                        minHeight: 200,
                      }}
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Task
                              provided={provided}
                              snapshot={snapshot}
                              task={task}
                              otherTasks={tasks}
                              getNewData={getNewData}
                              projectDueDate={projectDueDate}
                              projectId={projectId}
                              group={group}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))
          )}
        </DragDropContext>
      </div>
    </>
  );
}
