import React, { useState } from "react";
import { Card, Modal, Progress } from "antd";


const TaskModal = ({ isModalVisible, handleOk, handleCancel,tasku}) => {
  return (
    <Modal
      title="Task Description"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      // confirmLoading={confirmLoading}
    >
      <p>{tasku.description}</p>
    </Modal>
  );
};

export default function Task({ provided, snapshot, task }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [_description_, set_description_] = useState("");
  // const [_Title_, set_Title_] = useState("");

  // set_Title_(_Title);
  // set_description_(_description);
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
       title={task.title}
       onDoubleClick={showModal}
       
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
          textc:"#1890ff",
          backgroundColor: snapshot.isDragging,
          ...provided.draggableProps.style,
        }}
      >
        <p style={{color:"#696b6e", marginTop:20}}>double click for task info</p>

        <div style={{ width: 170 }}>
          { /*<Progress
            strokeColor="#1890ff"
            type="line"
            percent={30}
            size="small"
            status="normal"
        />*/}

          {console.log(task.description)}
          <TaskModal
            title="Task Description"
            isModalVisible={isModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
            tasku={task}
          >
            <p>{task.description}</p>
          </TaskModal>
        </div>
      </Card>
    </div>
  );
}
