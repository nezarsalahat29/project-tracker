import React, { useState, useEffect } from "react";
import {
  MainContainer,
  Sidebar,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useAuth } from "../contexts/AuthContext";
import {
  sendMessage,
  useMessagesData,
  getChatRoomsFromDbNotOptimized,
} from "../firestore/chatRooms";
import { GENERAL_CHATROOM } from "../firestore/index";
import Loader from "../components/Loader";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export default function Chat() {
  const [chatRooms, setChatRooms] = useState([]);
  const [activateChat, setActivateChat] = useState({
    id: GENERAL_CHATROOM,
    name: "Announcements",
  });
  const { currentUser } = useAuth();
  const [messageInputValue, setMessageInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [disabledInput, setDisabledInput] = useState(!currentUser.instructor);
  const [messages] = useMessagesData(activateChat.id);
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const getData = async () => {
      const chatRoomsFromDb = await getChatRoomsFromDbNotOptimized(
        currentUser.chatRooms
      );
      setChatRooms(chatRoomsFromDb);
      setLoading(false);
    };

    getData();
    window.addEventListener("resize", setDimension);
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [currentUser.chatRooms, messages, screenSize]);

  const sendNewMessage = () => {
    sendMessage(
      activateChat.id,
      messageInputValue,
      currentUser.id,
      currentUser.name
    );
    setMessageInputValue("");
  };
  return (
    <div style={{ height: screenSize.dynamicHeight * 0.8 }}>
      <MainContainer>
        <Sidebar position='left' scrollable={true}>
          {loading ? (
            <Loader />
          ) : (
            <ConversationList scrollable>
              {chatRooms.map((chatRoom) => {
                return (
                  <Conversation
                    info={chatRoom.lastMessage}
                    lastSenderName={
                      chatRoom.lastSender === ""
                        ? null
                        : chatRoom.lastSender === currentUser.name
                        ? "Me"
                        : chatRoom.lastSender
                    }
                    active={chatRoom.name === activateChat.name}
                    key={chatRoom.id}
                    id={chatRoom.id}
                    name={
                      currentUser.name === chatRoom.name
                        ? "Instructor"
                        : chatRoom.name
                    }
                    onClick={() => {
                      setActivateChat(chatRoom);
                      setDisabledInput(
                        currentUser.instructor
                          ? false
                          : chatRoom.name === "Announcements"
                          ? true
                          : false
                      );
                    }}
                  >
                    <Avatar
                      src={
                        "https://ui-avatars.com/api/?background=random&name=" +
                        (currentUser.name === chatRoom.name
                          ? "Instructor"
                          : chatRoom.name)
                      }
                      name={chatRoom.name}
                    />
                  </Conversation>
                );
              })}
            </ConversationList>
          )}
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <Avatar
              src={
                "https://ui-avatars.com/api/?background=random&name=" +
                (currentUser.name === activateChat.name
                  ? "Instructor"
                  : activateChat.name)
              }
              name={
                currentUser.name === activateChat.name
                  ? "Instructor"
                  : activateChat.name
              }
            />

            <ConversationHeader.Content
              userName={
                currentUser.name === activateChat.name
                  ? "Instructor"
                  : activateChat.name
              }
            />
            <ConversationHeader.Actions></ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList autoScrollToBottom={true}>
            {messages &&
              messages.map((message) => {
                return (
                  <Message
                    key={Math.random().toString(16).slice(2)}
                    model={{
                      message: message.text,
                      sentTime: String(message.createdAt),
                      sender: message.name,
                      direction:
                        message.name === currentUser.name
                          ? "outgoing"
                          : "incoming",
                      position: "single",
                    }}
                  >
                    <Avatar
                      style={{ justifyContent: "flex-start" }}
                      src={
                        "https://ui-avatars.com/api/?background=random&name=" +
                        message.name
                      }
                      name={message.name}
                    />
                    <Message.Footer
                      sender={message.name}
                      sentTime={timeAgo.format(
                        new Date(
                          message.createdAt
                            ? message.createdAt.seconds * 1000
                            : new Date()
                        )
                      )}
                    />
                  </Message>
                );
              })}
          </MessageList>
          <MessageInput
            disabled={disabledInput}
            attachButton={false}
            placeholder='Type message here'
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => sendNewMessage()}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
//TODO nothing sorry
