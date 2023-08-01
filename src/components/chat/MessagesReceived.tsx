import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

type Message = {
    message: String;
    groupID: String;
    username: String;
    createdTime: Date;
};

type MessagesReceivedProps = {
    socket: Socket;
};

const MessagesReceived: React.FC<MessagesReceivedProps> = ({ socket }) => {
    const [messagesRecieved, setMessagesReceived] = useState<Message[]>([]);

    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        const receiveMessageHandler = (data: Message) => {
            console.log(data.message)
            setMessagesReceived((prevState: Message[]) => [
                ...prevState,
                {
                    message: data.message,
                    groupID: data.groupID,
                    username: data.username,
                    createdTime: data.createdTime,
                },
            ]);
        };

        // Attach the 'receive_message' event listener
        socket.on('receive_message', (msg) => console.log(msg));

        // Remove event listener on component unmount
        return () => {
            socket.off('receive_message', receiveMessageHandler);
        };
    }, [socket]);

    // function formatDateFromTimestamp(timestamp) {
    //     const date = new Date(timestamp);
    //     return date.toLocaleString();
    // }

    return <div>
      {messagesRecieved.map((msg, i) => 
        <div>{msg.message}</div>
      )}
    </div>;
};

export default MessagesReceived;
