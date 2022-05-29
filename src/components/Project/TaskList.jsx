import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleTwoTone,
  FieldTimeOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";
//import { updateProject } from "../../firestore/projects";
import { v4 as uuidv4 } from "uuid";
uuidv4(); //

// const items = [
//   { id: uuidv4(), Title: "First Task", content: "The First task description" },
//   {
//     id: uuidv4(),
//     Title: "Second Task",
//     content: "The Second task description",

//   },
//   { id: uuidv4(), Title: "Third Task", content: "The Third task description" },
//   {
//     id: uuidv4(),
//     Title: "Fourth Task",
//     content: "The Fourth task description",
//   },
// ];

//const Titles = ["Late", "To-Do", "In progress", "Finished"];

// const ColumnsList = {
//   [uuidv4()]: {
//     icon: <ClockCircleOutlined style={{ color: "dodgerblue" }} />,
//     name: "To-Do  ",
//     items: [],
//   },

//   [uuidv4()]: {
//     name: "In Progress      ",
//     icon: <SyncOutlined spin style={{ color: "dodgerblue" }} />,
//     items: [],
//   },
//   [uuidv4()]: {
//     name: "Done      ",
//     icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
//     borderColor: "red",
//     items: [],
//   },
//   [uuidv4()]: {
//     name: "Late     ",
//     icon: <FieldTimeOutlined style={{ color: "red" }} />,
//     items: [],
//   },
// };

// const onDragEnd = (result, columns, setColumns) => {
//   if (!result.destination) return;
//   const { source, destination } = result;

//   if (source.droppableId !== destination.droppableId) {
//     //console.log(55555555555555555);
//     const sourceColumn = columns[source.droppableId];
//     const destColumn = columns[destination.droppableId];
//     const sourceItems = [...sourceColumn.items];
//     const destItems = [...destColumn.items];
//     const [removed] = sourceItems.splice(source.index, 1);
//     destItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...sourceColumn,
//         items: sourceItems,
//       },
//       [destination.droppableId]: {
//         ...destColumn,
//         items: destItems,
//       },
//     });
//   } else {
//     const column = columns[source.droppableId];
//     const copiedItems = [...columns.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);

//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...column,
//         items: copiedItems,
//       },
//     });
//   }
// };

//!Tasklist
// function TaskList(tasks, projectId, getNewData)
export default function TaskList({ tasks }) {
  const [columns, setColumns] = useState([
    {
      id: uuidv4(),
      name: "todo",
      tasks: [],
    },
    {
      id: uuidv4(),
      name: "doing",
      tasks: [],
    },
    {
      id: uuidv4(),
      name: "done",
      tasks: [],
    },
    {
      id: uuidv4(),
      name: "delayed",
      tasks: [],
    },
  ]);



  useEffect(() => {
    const getData = () => {
      setColumns((columns) => [
        ...columns.map((column) => {
          tasks.forEach((task) => {
            if (task.status === column.name) column.tasks.push(task);
          });
          return column;
        }),
      ]);
    };

    getData();
   
  }, [tasks]);
  const onDragEnd = (result) => {
    console.log(result);
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
      //updateProject(projectId, { tasks });

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
    }
  };

  //!return
  return (
    <div style={{ justifyContent: "center" }}>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {columns.map((column) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
                key={column.name}
              >
                <h2 style={{ fontWeight: "bold" }}>
                  {column.name}
                  <span>{column.icon}</span>
                </h2>

                <div style={{ margin: 6 }}>
                  <Droppable droppableId={column.name} key={column.name}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#69c0ff"
                              : "#f0f5ff",
                            fontSize: "30px",
                            padding: 4,
                            width: 260,
                            minHeight: 500,
                            color: "black",
                          }}
                        >
                          {column.tasks.map((task, index) => {
                            return (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Task
                                      provided={provided}
                                      snapshot={snapshot}
                                      task={task}
                                    />
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

