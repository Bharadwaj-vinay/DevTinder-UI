import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import {createSocketConnection} from '../utils/socketClient';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const {targetUserId} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector(store => store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        const chat = axios.get(BASE_URL + "/chat/" + targetUserId, {
            withCredentials: true,
        });

        console.log((await chat).data.messages);
        const chatMessages = (chat?.data?.messages || []).map(item => {
            const {senderId, text} = msg;
            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text
            }
        });

        setMessages(chatMessages);
    };

    useEffect(() => {
        fetchChatMessages()
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }

        const socket = createSocketConnection();
        //As the page loads, the scoket connection is established & joinChat event is emitted
        socket.emit("joinChat", {userId, targetUserId});

        socket.on("messageReceived", ({firstName, text, lastName}) => {
            setMessages(prevState => [...prevState, {firstName, text, lastName}]);
        });

        return () => socket.disconnect();
        // close socket connection on unmount
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();

        socket.emit(("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage,
        }));

        setNewMessage("");
    };
    
    return (
        <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
            <h1 className='p-5 border-b border-gray-600'>Chat</h1>
            <div className='flex-1 overflow-scroll p-5'>
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className ={"chat " + (user.firstName === msg.firstName 
                            ? "chat-end" : "chat-start" )
                            }
                        >
                            <div className="chat-header">
                            {`${msg.firstName}  ${msg.lastName}`}
                            <time className="text-xs opacity-50">2 hours ago</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                      </div>
                    );
                })}
            </div>
            <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
                <input value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    className='flex-1 border bg-black rounded border-gray-500 text-white'></input>
                <button onClick={sendMessage} className='btn btn-secondary'>Send</button>
            </div>
        </div>
    )
}

export default Chat;