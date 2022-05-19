
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Typography, Button, Layout, Menu, Breadcrumb, Image, Space } from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    AppstoreAddOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Row, Col, Divider } from "antd";
import { Progress } from 'antd';
import { Descriptions } from 'antd';
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;


function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    { id: "1", content: "First Task" },
    { id: "2", content: "Second Task" },
    { id: "3", content: "Third Task" },
    { id: "4", content: "Fourth Task" },
    { id: "5", content: "Fifth Task" }
]
const Titles = ["Requested Tasks", "To-Do", "In progress", "Finished"];
const List = [
    {
        key: "1",
        name: "Requested Tasks",
        items: items,
    },

    {
        key: "2",
        name: "To-Do",
        items: [],
    },
    {
        key: "3",
        name: "In progress",
        items: [],
    },
    {
        key: "4",
        name: "Finished",
        items: [],
    },
];

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
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
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

function TasksLists() {
    const [columns, setColumns] = useState(Titles);
    return (

        <div style={{ marginTop: "50px", justifyContent: "center" }}>
            <hr />
            <Title>
                <h1 style={{ textAlign: "center", width: Header }}>
                    Tasks Lists
                </h1>
            </Title>
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <DragDropContext
                    onDragEnd={result => onDragEnd(result, columns, setColumns)}
                >
                    {List.map((column, index) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                                key={column.Id}
                            >
                                <h2>{column.name}</h2>
                                <div style={{ margin: 8 }}>
                                    <Droppable droppableId={column.id} key={column.id}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "lightblue"
                                                            : "lightgrey",
                                                        padding: 4,
                                                        width: 250,
                                                        minHeight: 500
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
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: "none",
                                                                                padding: 16,
                                                                                margin: "0 0 8px 0",
                                                                                minHeight: "50px",
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "#263B4A"
                                                                                    : "#456C86",
                                                                                color: "white",
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.content}
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
