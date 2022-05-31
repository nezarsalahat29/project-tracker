import React, { useState } from "react";
import { Card, Modal, Progress } from "antd";
import { Row, Col, Divider } from "antd";
import { list } from "antd";

const TaskModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  tasku,
  title,
  Content,
}) => {
  return (
    <Modal
      width={700}
      title={<h5>{title}</h5>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      // confirmLoading={confirmLoading}
    >
      {
        <di>
          <p>
            <Divider orientation="left">Task ID</Divider>
            <Row className="TaskModalLeft">
              <Col flex="auto">{tasku.id}</Col>
            </Row>
          </p>

          <p>
            <Divider orientation="left">Description</Divider>
            <Row className="TaskModalLeft">
              <Col flex="auto">{tasku.description}</Col>
            </Row>
          </p>
          <p>
            <Divider orientation="left">Status</Divider>
            <Row className="TaskModalLeft">
              <Col flex="auto">{tasku.status}</Col>
            </Row>
          </p>
          <p>
            <Divider orientation="left">DueDate</Divider>
            <Row className="TaskModalLeft">
              <Col flex="auto">{tasku.dueDate}</Col>
            </Row>
          </p>

          <p>
            <Divider orientation="left">Resources</Divider>
            <Row className="TaskModalLeft">
              <Col style={{ color: "#666a6e " }} flex="auto">
                {tasku.resources.map((i) => {
                  return <p><a href={i}> {i}</a></p>;
                })}
              </Col>
            </Row>
          </p>
          <p>
            <Divider orientation="left">Comments</Divider>
            <Row className="TaskModalLeft">
              <Col style={{ color: "#666a6e " }} flex="auto">
                {tasku.comments.map((i) => {
                  return <p> {i}</p>;
                })}
              </Col>
            </Row>
          </p>
        </di>
      }
    </Modal>
  );
};

export default function Task({ provided, snapshot, task }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {  
    setIsModalVisible(false);
  };

  /*const onCreate = () => {
    console.log('create');
  };*/

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        onDoubleClick={showModal}
        size="default"
        bordered={true}
        
        bodyStyle={{
          backgroundColor: "dodgerblue",
          fontWeight: "bold",
          color: "white",
          fontSize: "15px",
        }}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          userSelect: "none",
          padding: 3,
          margin: "0 0 2px 0",
          minHeight: "50px",
          fontWeight: "450",
          textAlign: "center",
          fontSize: "15px",
          borderColor: "#07374a",
          textc: "#1890ff",
          backgroundColor: snapshot.isDragging,
          ...provided.draggableProps.style,
        }}
      >
        <p style={{ color: "white", marginTop: 20 }}>
          {task.title}
        </p>

        <div style={{ width: 170 }}>
          {console.log(task.description)}
          <TaskModal
            title="Task infromation"
            isModalVisible={isModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
            tasku={task}
          ></TaskModal>
        </div>
      </Card>
    </div>
  );
}
