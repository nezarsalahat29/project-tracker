//https://chatscope.io/storybook/react/?path=/docs/components-maincontainer--without-right-sidebar
import React, { useState, useEffect } from "react";
import {
  MainContainer,
  Sidebar,
  Search,
  ChatContainer,
  ConversationHeader,
  MessageList,
  MessageSeparator,
  Message,
  TypingIndicator,
  MessageInput,
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useAuth } from "../contexts/AuthContext";

const ChatRoomsList = [
  { name: "Lilly", lastSenderName: "Lilly", info: "Yes i can do it for you" },
  { name: "Joe", lastSenderName: "Joe", info: "Yes i can do it for you" },
  { name: "Emily", lastSenderName: "Emily", info: "Yes i can do it for you" },
  { name: "Kai", lastSenderName: "Kai", info: "Yes i can do it for you" },
  { name: "Akane", lastSenderName: "Akane", info: "Yes i can do it for you" },
  { name: "Eliot", lastSenderName: "Eliot", info: "Yes i can do it for you" },
  { name: "Zoe", lastSenderName: "Zoe", info: "Yes i can do it for you" },
  {
    name: "Patrik",
    lastSenderName: "Patrik",
    info: "Yes i can do it for you",
  },
];

export default function Chat() {
  const [activateChat, setActivateChat] = useState(ChatRooms[0]);
  const { currentUser } = useAuth();
  const [messageInputValue, setMessageInputValue] = useState("");
  console.log(currentUser);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ height: 800 }}>
      <MainContainer>
        <Sidebar position='left' scrollable={true}>
          <Search placeholder='Search...' />
          <ConversationList>
            {ChatRooms.map((conversation) => {
              return (
                <Conversation
                  id={conversation.chatroomID}
                  name={conversation.name}
                  lastSenderName={
                    conversation.lastSenderName === currentUser.username
                      ? "Me"
                      : conversation.lastSenderName
                  }
                  info={conversation.lastMessage}
                  onClick={function (value) {
                    console.log(value.target.offsetParent.id);
                    ChatRooms.forEach(function (element) {
                      if (element.chatroomID === value.target.offsetParent.id)
                        setActivateChat(element);
                      console.log(activateChat);
                    });
                  }}
                >
                  <Avatar
                    src={
                      "https://ui-avatars.com/api/?name=" + conversation.name
                    }
                    name={conversation.name}
                  />
                </Conversation>
              );
            })}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <Avatar
              src={"https://ui-avatars.com/api/?name=" + activateChat.name}
              name={activateChat.name}
            />

            <ConversationHeader.Content userName={activateChat.name} />
            <ConversationHeader.Actions></ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList autoScrollToBottom={true}>
            {activateChat.Messages.map(function (message) {
              return (
                <Message
                  model={{
                    message: message.message,
                    sentTime: "15 mins ago",
                    sender: message.sender,
                    direction:
                      message.sender === currentUser.username
                        ? "outgoing"
                        : "incoming",
                    position: "single",
                  }}
                >
                  <Avatar
                    src={"https://ui-avatars.com/api/?name=" + message.sender}
                    name={message.sender}
                  ></Avatar>
                </Message>
              );
            })}
          </MessageList>
          <MessageInput
            attachButton={false}
            placeholder='Type message here'
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={function (val) {
              activateChat.Messages.push({
                message: val,
                sentTime: "15 mins ago",
                sender: currentUser.username,
                position: "single",
              });
              setMessageInputValue("");
            }}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

var ChatRooms = [
  {
    name: "Instructor",
    chatroomID: "123456789",
    lastSenderName: "Instructor",
    lastMessage: "Yes i can do it for you",
    participants: ["Instructor", "Suhaib Atef"],
    Messages: [
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Instructor",
        position: "single",
      },
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Suhaib Atef",
        position: "single",
      },
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Suhaib Atef",
        position: "single",
      },
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Instructor",
        position: "single",
      },
    ],
  },
  {
    name: "Group A",
    chatroomID: "877951335",
    lastSenderName: "Suhaib Atef",
    lastMessage: "Yes i can do it for you",
    participants: ["Instructor", "Suhaib Atef", "Jafar Al-Juneidi"],
    Messages: [
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Instructor",
        position: "single",
      },
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Suhaib Atef",
        position: "single",
      },
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Suhaib Atef",
        position: "single",
      },
      {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Jafar Al-Juneidi",
        position: "single",
      },
    ],
  },
];
