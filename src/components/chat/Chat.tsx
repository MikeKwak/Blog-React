import MessagesReceived from './MessagesReceived';
import { styled } from 'styled-components';
import SendMessage from './SendMessage'
import io, { Socket } from 'socket.io-client';
import { useContext } from 'react';
import { UserContext } from '../../containers/auth/UserContext';
import { GroupContext } from '../../containers/groups/GroupContext';



const ChatBlock = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 20px;
`;

const Chat: React.FC = () => {
    const socket : Socket = io('http://localhost:4000');

    const { user } = useContext(UserContext)
    const { group } = useContext(GroupContext)
    const roomId = group.groupID;

    socket.emit('join_room', { roomId });

    return (
        <ChatBlock>
            <MessagesReceived socket={socket} />;
            <SendMessage socket={socket} username={user!.username} groupID={roomId}></SendMessage>
        </ChatBlock>
    );
};

export default Chat;
