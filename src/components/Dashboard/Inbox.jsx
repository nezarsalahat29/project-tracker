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
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const conversationsFromDb = await getChatRoomsFromDbNotOptimized(
        currentUser.chatRooms
      );
      console.log("frontend chatRooms", conversationsFromDb);
      console.log("first convo: ", conversationsFromDb[0]);

      setConversations(conversationsFromDb);
    };

    getData();
  }, [currentUser.chatRooms]);

  return (
    <Link to='/Chat'>
      <Card style={{ backgroundColor: "#F7F7F7", height: "100%" }}>
        <Title level={2}>Inbox</Title> <Divider />
        <ConversationList>
          {conversations.map((convers) => {
            return (
              <Conversation
                info={convers.lastMessage}
                lastSenderName={
                  convers.lastSender === currentUser.name
                    ? "Me"
                    : convers.lastSender
                }
                name={
                  currentUser.name === convers.name
                    ? "Instructor"
                    : convers.name
                }
              >
                <Avatar
                  src={
                    "https://ui-avatars.com/api/?background=random&name=" +
                    convers.name
                  }
                  name={convers.name}
                />
              </Conversation>
            );
          })}
        </ConversationList>
      </Card>
    </Link>
  );
}
