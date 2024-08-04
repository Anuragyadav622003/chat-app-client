import React, { useState, useContext } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { SocketContext } from '../Context';

const Chat = () => {
    const { sendMessage, messages } = useContext(SocketContext);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage('');
    };

    return (
        <div>
            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={msg.message} />
                    </ListItem>
                ))}
            </List>
            <TextField
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
            >
                Send
            </Button>
        </div>
    );
};

export default Chat;
