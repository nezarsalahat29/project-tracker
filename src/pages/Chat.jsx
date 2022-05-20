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
import {
  // createConversation,
  // deleteConversation,
  sendMessage,
  getChatRoomsFromDb,
  useMessagesData,
  getChatRoomsFromDbNotOptimized,
  GENERAL_CHATROOM,
} from "../firestore";
import Loader from "../components/Loader";

// function getName(list, userName) {
//   console.log(list);
//   console.log(userName);
//   return userName === list[0] ? list[1] : list[0];
// }

// const ChatRoomsList = [
//   { name: 'Lilly', lastSenderName: 'Lilly', info: 'Yes i can do it for you' },
//   { name: 'Joe', lastSenderName: 'Joe', info: 'Yes i can do it for you' },
//   { name: 'Emily', lastSenderName: 'Emily', info: 'Yes i can do it for you' },
//   { name: 'Kai', lastSenderName: 'Kai', info: 'Yes i can do it for you' },
//   { name: 'Akane', lastSenderName: 'Akane', info: 'Yes i can do it for you' },
//   { name: 'Eliot', lastSenderName: 'Eliot', info: 'Yes i can do it for you' },
//   { name: 'Zoe', lastSenderName: 'Zoe', info: 'Yes i can do it for you' },
//   {
//     name: 'Patrik',
//     lastSenderName: 'Patrik',
//     info: 'Yes i can do it for you',
//   },
// ];

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [activateChat, setActivateChat] = useState({ id: GENERAL_CHATROOM });
  const { currentUser } = useAuth();
  const [messageInputValue, setMessageInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  // console.log(currentUser);

  const [messages] = useMessagesData(activateChat.id);
  // console.log('activeChat: ', activateChat.id);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getData = async () => {
      const conversationsFromDb = await getChatRoomsFromDbNotOptimized(
        currentUser.chatRooms
      );
      console.log("frontend chatRooms", conversationsFromDb);
      console.log("first convo: ", conversationsFromDb[0]);

      setConversations(conversationsFromDb);
      setLoading(false);
    };

    getData();
  }, []);

  // const getConversations = async () => {
  //   const conversation = await getConversationFromDb(UserChatRoomID);
  //   console.log('return list:');
  //   setConversations(conversation);
  // };

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
    <div style={{ height: 800 }}>
      {activateChat && console.log("active Chat:", activateChat)}
      <MainContainer>
        <Sidebar position='left' scrollable={true}>
          <Search placeholder='Search...' />
          {loading ? (
            <Loader />
          ) : (
            <ConversationList>
              {conversations.map((conversation) => {
                return (
                  <Conversation
                    key={conversation.id}
                    id={conversation.id}
                    name={conversation.name}
                    onClick={() => setActivateChat(conversation)}
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
          )}
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <Avatar
              src={
                "https://ui-avatars.com/api/?name=" +
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
                    model={{
                      message: message.text,
                      sentTime: message.createdAt,
                      sender: message.name,
                      direction:
                        message.name === currentUser.name
                          ? "outgoing"
                          : "incoming",
                      position: "single",
                    }}
                  >
                    <Avatar
                      src={"https://ui-avatars.com/api/?name=" + message.name}
                      name={message.name}
                    ></Avatar>
                  </Message>
                );
              })}
          </MessageList>
          <MessageInput
            disabled={false}
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
