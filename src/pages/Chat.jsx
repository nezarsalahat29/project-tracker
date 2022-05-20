//https://chatscope.io/storybook/react/?path=/docs/components-maincontainer--without-right-sidebar
import React, { useState, useEffect } from 'react';
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
} from '@chatscope/chat-ui-kit-react';
import { useAuth } from '../contexts/AuthContext';
import {
  // createConversation,
  // deleteConversation,
  sendMessage,
  getChatRoomsFromDb,
  useMessagesData,
} from '../firestore';

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

var UserChatRoomID = ['ELN8CuTpwdv5vIQ4AE4S', 'VI4aYHvIItF0LXnAXhFj'];

export default function Chat() {
  const [conversations, setConversations] = useState();
  const [activateChat, setActivateChat] = useState({});
  const { currentUser } = useAuth();
  const [messageInputValue, setMessageInputValue] = useState('');
  // console.log(currentUser);

  const [messages] = useMessagesData('ELN8CuTpwdv5vIQ4AE4S');
  // console.log('activeChat: ', activateChat.id);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getData = async () => {
      // await Promise.all([getConversations()]);
      const coversationsFromDb = await getChatRoomsFromDb(UserChatRoomID);
      console.log('frontend chatRooms', coversationsFromDb);
      setConversations(coversationsFromDb);
      setActivateChat(coversationsFromDb[0]);
      console.log('active Chat:', activateChat);
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
      'ELN8CuTpwdv5vIQ4AE4S',
      messageInputValue,
      currentUser.id,
      currentUser.name
    );
    setMessageInputValue('');
  };
  return (
    <div style={{ height: 800 }}>
      <MainContainer>
        <Sidebar position='left' scrollable={true}>
          <Search placeholder='Search...' />
          <ConversationList>
            {conversations &&
              conversations.map((conversation) => {
                return (
                  <Conversation
                    key={conversation.chatroomID}
                    id={conversation.chatroomID}
                    //   conversation.name
                    name={
                      conversation.name
                      // conversation.isGroup
                      //   ? conversation.name
                      //   : getName(
                      //       conversation.participants,
                      //       currentUser.username
                      //     )
                    }
                    lastSenderName={
                      conversation.lastSenderName === currentUser.username
                        ? 'Me'
                        : conversation.lastSenderName
                    }
                    info={conversation.lastMessage}
                    onClick={() => setActivateChat(conversation)}
                  >
                    <Avatar
                      src={
                        'https://ui-avatars.com/api/?name=' + conversation.name
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
              src={
                'https://ui-avatars.com/api/?name=' + 'activateChat.name'
                // (activateChat.isGroup
                //   ? activateChat.name
                //   : getName(activateChat.participants, currentUser.username))
              }
              name={
                'activateChat.name'
                // activateChat.isGroup
                //   ? activateChat.name
                //   : getName(activateChat.participants, currentUser.username)
              }
            />

            <ConversationHeader.Content
              userName={
                'activateChat.name'
                // activateChat.isGroup
                //   ? activateChat.name
                //   : getName(activateChat.participants, currentUser.username)
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
                          ? 'outgoing'
                          : 'incoming',
                      position: 'single',
                    }}
                  >
                    <Avatar
                      src={'https://ui-avatars.com/api/?name=' + message.name}
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
            // onSend={function (val) {
            //   conversations
            //     .find(
            //       (element) => element.chatroomID === activateChat.chatroomID
            //     )
            //     .Messages.push({
            //       message: val,
            //       sentTime: new Date(),
            //       sender: currentUser.username,
            //       position: 'single',
            //     });
            //   conversations.find(
            //     (element) => element.chatroomID === activateChat.chatroomID
            //   ).lastMessage = val;
            //   conversations.find(
            //     (element) => element.chatroomID === activateChat.chatroomID
            //   ).lastSenderName = currentUser.username;
            //   setActivateChat(
            //     conversations.find(
            //       (element) => element.chatroomID === activateChat.chatroomID
            //     )
            //   );
            //   setMessageInputValue('');
            //   sendNewMessage();
            // }}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

// var ChatRooms = [
//   {
//     name: 'Instructor',
//     isGroup: false,
//     chatroomID: '123456789',
//     lastSenderName: 'Instructor',
//     lastMessage: 'Yes i can do it for you',
//     participants: ['AdminX2022', 'Suhaib Atef'],
//     Messages: [
//       {
//         message: 'Hello my friend',
//         sentTime: '15 mins ago',
//         sender: 'AdminX2022',
//         position: 'single',
//       },
//       {
//         message: 'Hello my friend',
//         sentTime: '15 mins ago',
//         sender: 'Suhaib Atef',
//         position: 'single',
//       },
//       {
//         message: 'Hello my friend',
//         sentTime: '15 mins ago',
//         sender: 'Suhaib Atef',
//         position: 'single',
//       },
//       {
//         message: 'Hello my friend',
//         sentTime: '15 mins ago',
//         sender: 'AdminX2022',
//         position: 'single',
//       },
//     ],
//   },
//   {
//     name: 'Group A',
//     isGroup: true,
//     chatroomID: '877951335',
//     lastSenderName: 'Suhaib Atef',
//     lastMessage: 'Yes i can do it for you',
//     participants: ['AdminX2022', 'Suhaib Atef', 'Jafar Al-Juneidi'],
//     Messages: [
//       {
//         message: 'Hello my friend',
//         sentTime: '15 mins ago',
//         sender: 'AdminX2022',
//         position: 'single',
//       },
//       {
//         message: 'Hello my friend',
//         sentTime: '15 mins ago',
//         sender: 'Suhaib Atef',
//         position: 'single',
//       },
//       {
//         message: 'Hello my friend',
//         sentTime: '15 mins ago',
//         sender: 'Suhaib Atef',
//         position: 'single',
//       },
//       {
//         message: 'Hello my friend',
//         sentTime: '15 mins ago',
//         sender: 'Jafar Al-Juneidi',
//         position: 'single',
//       },
//     ],
//   },
// ];
