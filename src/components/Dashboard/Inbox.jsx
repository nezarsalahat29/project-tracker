import React, { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { Card } from "antd";
import { Divider } from "antd";
import { Typography } from "antd";
import { getChatRoomsFromDbNotOptimized } from "../../firestore/chatRooms";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function Inbox() {
  const { currentUser } = useAuth();
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const chatroomsFromDb = await getChatRoomsFromDbNotOptimized(
        currentUser.chatRooms
      );

      setChatRooms(chatroomsFromDb);
    };

    getData();
  }, [currentUser.chatRooms]);

  return (
    <Link to='/Chat'>
      <Card style={{ backgroundColor: "#F7F7F7", height: "100%" }}>
        <Title level={2}>Inbox</Title> <Divider />
        <ConversationList
          scrollable
          style={{
            height: "340px",
          }}
        >
          {chatRooms.map((chatroom) => {
            return (
              <Conversation
                key={chatroom.id}
                id={chatroom.id}
                info={chatroom.lastMessage}
                lastSenderName={
                  chatroom.lastSender === ""
                    ? null
                    : chatroom.lastSender === currentUser.name
                    ? "Me"
                    : chatroom.lastSender
                }
                name={
                  currentUser.name === chatroom.name
                    ? "Instructor"
                    : chatroom.name
                }
              >
                <Avatar
                  src={
                    "https://ui-avatars.com/api/?background=random&name=" +
                    (currentUser.name === chatroom.name
                      ? "Instructor"
                      : chatroom.name)
                  }
                  name={chatroom.name}
                />
              </Conversation>
            );
          })}
        </ConversationList>
      </Card>
    </Link>
  );
}
