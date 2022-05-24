import { v4 as uuidv4 } from 'uuid';


import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleTwoTone,
  FieldTimeOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Typography, Layout } from "antd";
import { Card } from "antd";
import { Divider } from "antd";
import { Progress } from "antd";
const { Header } = Layout;
const { Title } = Typography;
uuidv4(); //
const items = [
  { id:  uuidv4(), Title: "First Task", content: "The First task description" },
  { id:  uuidv4(), Title: "Second Task", content: "The Second task description" },
  { id:  uuidv4(), Title: "Third Task", content: "The Third task description" },
  { id:  uuidv4(), Title: "Fourth Task", content: "The Fourth task description" },
];

//const Titles = ["Late", "To-Do", "In progress", "Finished"];


const ColumnsList = {
  
     [uuidv4()]:{
    icon: <ClockCircleOutlined style={{ color: "dodgerblue" }} />,
    name: "To-Do  ",
    items: items},
     

    [uuidv4()]:{
    name: "In Progress      ",
    icon: <SyncOutlined spin style={{ color: "dodgerblue" }} />,
    items: []
  },
  [uuidv4()]:{
    name: "Done      ",
    icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    borderColor: "red",
    items: []
  },
  [uuidv4()]:{
    name: "Late     ",
    icon: <FieldTimeOutlined style={{ color: "red" }} />,
    items: []
  }
};



const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    console.log(55555555555555555);
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...columns.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function TasksLists() {
  const [columns, setColumns] = useState(ColumnsList);
  return (
    <div style={{ justifyContent: "center" }}>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId,column ],index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
                key={columnId}
              >
                <h2 style={{ fontWeight: "bold" }}>
                  {column.name}
                  <span>{column.icon}</span>
                </h2>

                <div style={{ margin: 6 }}>
                  <Droppable droppableId={columnId} key={columnId}>
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
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div className="site-card-border-less-wrapper">
                                      <Card
                                        title={item.Title}
                                        size="small"
                                        bordered={true}
                                        headStyle={{
                                          backgroundColor: "dodgerblue",
                                          fontWeight: "bold",
                                          color: "white",
                                          fontSize: "20px",
                                        }}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 10,
                                          margin: "0 0 2px 0",
                                          minHeight: "50px",
                                          fontWeight: "450",
                                          textAlign: "center",
                                          fontSize: "15px",
                                          borderColor: "0092ff",
                                          backgroundColor: snapshot.isDragging,
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <p
                                          style={{
                                            wordbreak: "keep-all",
                                          }}
                                        >
                                          {item.content}.
                                        </p>

                                        <div style={{ width: 170 }}>
                                          <Progress
                                            strokeColor="#1890ff"
                                            type="line"
                                            percent={30}
                                            size="small"
                                            status="normal"
                                          />
                                        </div>
                                      </Card>
                                    </div>
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

export default TasksLists;
