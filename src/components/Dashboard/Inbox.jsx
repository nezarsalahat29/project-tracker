import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    ConversationList,
    Conversation,
    Avatar,
} from '@chatscope/chat-ui-kit-react';
import { Card } from 'antd';
import { Divider } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

const Data = [
    { name: 'Lilly', lastSenderName: 'Lilly', info: 'Yes i can do it for you' },
    { name: 'Joe', lastSenderName: 'Joe', info: 'Yes i can do it for you' },
    { name: 'Emily', lastSenderName: 'Emily', info: 'Yes i can do it for you' },
    { name: 'Kai', lastSenderName: 'Kai', info: 'Yes i can do it for you' },
    { name: 'Akane', lastSenderName: 'Akane', info: 'Yes i can do it for you' },
    { name: 'Eliot', lastSenderName: 'Eliot', info: 'Yes i can do it for you' },
    { name: 'Zoe', lastSenderName: 'Zoe', info: 'Yes i can do it for you' },
    {
        name: 'Patrik',
        lastSenderName: 'Patrik',
        info: 'Yes i can do it for you',
    },
];
export default function Inbox() {
    return (
        <Card style={{ backgroundColor: '#F7F7F7', height: '100%' }}>
            <Title level={2}>Inbox</Title> <Divider />
            <ConversationList>
                {Data.map((convers) => {
                    return (
                        <Conversation
                            name={convers.name}
                            lastSenderName={convers.lastSenderName}
                            info={convers.info}
                        >
                            <Avatar
                                src={
                                    'https://ui-avatars.com/api/?name=' +
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
