import React, { useState } from "react";
import { Card, Modal, Progress } from "antd";


const TaskModal = ({ isModalVisible, handleOk, handleCancel,task}) => {
  return (
    <Modal
      title="Task Description"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      // confirmLoading={confirmLoading}
    >
      <p>{task.Content}</p>
    </Modal>
  );
};

export default function Task({ provided, snapshot, task }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [_Content_, set_Content_] = useState("");
  // const [_Title_, set_Title_] = useState("");

  // set_Title_(_Title);
  // set_Content_(_Content);
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
        title={task.Title}
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
          {task.Content}
        </p>

        <div style={{ width: 170 }}>
          {/* <Progress
            strokeColor="#1890ff"
            type="line"
            percent={30}
            size="small"
            status="normal"
          /> */}

          {console.log(task.Content)}
          <TaskModal
            title="Task Description"
            isModalVisible={isModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
          >
            <p>{task.Content}</p>
          </TaskModal>
        </div>
      </Card>
    </div>
  );
}
