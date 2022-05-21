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
  }, []);

  return (
    <Card style={{ backgroundColor: "#F7F7F7", height: "100%" }}>
      <Title level={2}>Inbox</Title> <Divider />
      <ConversationList>
        {conversations.map((convers) => {
          return (
            <Conversation
              name={convers.name}
              lastSenderName={convers.lastSenderName}
              info={convers.lastMessage}
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
  );
}
