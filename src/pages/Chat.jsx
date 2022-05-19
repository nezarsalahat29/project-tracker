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

const ChatRoomsList = [
  {
    name: 'Lilly',
    lastSenderName: 'Lilly',
    info: 'Yes i can do it for you',
    id: '1',
  },
  {
    name: 'Joe',
    lastSenderName: 'Joe',
    info: 'Yes i can do it for you',
    id: '2',
  },
  {
    name: 'Emily',
    lastSenderName: 'Emily',
    info: 'Yes i can do it for you',
    id: '3',
  },
  {
    name: 'Kai',
    lastSenderName: 'Kai',
    info: 'Yes i can do it for you',
    id: '4',
  },
  {
    name: 'Akane',
    lastSenderName: 'Akane',
    info: 'Yes i can do it for you',
    id: '5',
  },
  {
    name: 'Eliot',
    lastSenderName: 'Eliot',
    info: 'Yes i can do it for you',
    id: '6',
  },
  {
    name: 'Zoe',
    lastSenderName: 'Zoe',
    info: 'Yes i can do it for you',
    id: '7',
  },
  {
    name: 'Patrik',
    lastSenderName: 'Patrik',
    info: 'Yes i can do it for you',
    id: '8',
  },
];

export default function Chat() {
  const [messageInputValue, setMessageInputValue] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <MainContainer responsive>
        <Sidebar position='left' scrollable={false}>
          <Search placeholder='Search...' />
          <ConversationList>
            {ChatRoomsList.map((conversation) => {
              return (
                <Conversation
                  key={conversation.id}
                  name={conversation.name}
                  lastSenderName={conversation.lastSenderName}
                  info={conversation.info}
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
            <ConversationHeader.Back />
            <Avatar
              src={'https://ui-avatars.com/api/?name=zoeIco'}
              name='Zoe'
            />

            <ConversationHeader.Content
              userName='Zoe'
              info='Active 10 mins ago'
            />
            <ConversationHeader.Actions></ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList typingIndicator={<TypingIndicator />}>
            <MessageSeparator content='Saturday, 30 November 2019' />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'single',
              }}
            >
              <Avatar
                src={'https://ui-avatars.com/api/?name=zoeIco'}
                name='Zoe'
              />
            </Message>
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'single',
              }}
            />
            <Message
              model={{
                message: 'Hello my friend firsssst',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'first',
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'normal',
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: 'Hello my friend normaaaaaal',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'normal',
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: 'Hello my friend lasssssst',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'last',
              }}
            >
              <Avatar
                src={'https://ui-avatars.com/api/?name=zoeIco'}
                name='Zoe'
              />
            </Message>
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'first',
              }}
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'normal',
              }}
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'normal',
              }}
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'last',
              }}
            />

            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'first',
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'last',
              }}
            >
              <Avatar
                src={'https://ui-avatars.com/api/?name=zoeIco'}
                name='Zoe'
              />
            </Message>
          </MessageList>
          <MessageInput
            attachButton={false}
            placeholder='Type message here'
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
