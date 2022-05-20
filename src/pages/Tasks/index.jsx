
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

]
const Titles = ["Requested Tasks", "To-Do", "In progress", "Finished"];
const List = [
    {
        id: 1,
        icon: " 📂 ",
        name: "Requested Tasks",
        items: items,
    },

    {
        id: 2,
        name: "To-Do",
        icon: "📝",
        items: [],
    },
    {
        id: 3,
        name: "In progress",
        icon: "⚡️",
        items: [],
    },
    {
        id: 4,
        name: "Finished",
        icon: "✅",
        items: [],
    },
];
const statuses = [{
    status: "Requested Tasks",

    color: "#EB5A46"
}, {
    status: "In Progress",

    color: "#00C2E0"
}, {
    status: "To-Do",

    color: "#C377E0"
}, {
    status: "Finished",

    color: "#3981DE"
}];

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
                <h1 style={{ textAlign: "center", width: Header, fontWeight: 'bold' }}>
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
                                    alignItems: "center",
                                    fontWeight: 'bold',
                                }}
                                key={column.id}
                            >
                                <h2 style={{ fontWeight: 'bold' }}>{column.name}<span>{column.icon}</span></h2>

                                <div style={{ margin: 8 }}>
                                    <Droppable droppableId={column.id} key={column.id}>
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
                                                        color: "black"
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
                                                                            <Card title="Task Title" size='small' bordered={true}
                                                                                headStyle={{
                                                                                    backgroundColor: "#002766",
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
                                                                                    fontWeight: '450',
                                                                                    textAlign: "center",
                                                                                    fontSize: "15px",
                                                                                    borderColor: "#002766",




                                                                                    ...provided.draggableProps.style
                                                                                }}
                                                                            >
                                                                                <p> <h3> Task Description :</h3> <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>


                                                                                <div style={{ width: 170 }}>
                                                                                    <Progress strokeColor="#1890ff" type="line" percent={30} size="small" status="normal" />
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
