import React, { useEffect, useState } from 'react';

import { HiLogout } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";

import { LiveChatContainer } from './LiveChat.styled';
import { receiveMessage, sendMessage } from '../../services/socketServices/chatSocketService';

const LiveChat = () => {

  const [messages, setMessages] = useState([]);

  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        text: inputValue,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      sendMessage(newMessage, "/app/chat/send");
    }
  }

  useEffect(() => {
    receiveMessage("/topic/messages", (message) => {
      setMessages((prev) => [...prev, message]);
      setInputValue("");
    });
  }, []);

  return (
    <LiveChatContainer>
      <div className="chat-header">
        <div className='collapse'>
          <HiLogout className='collapse-icon' />
        </div>
        <div className='header'>
          stream chat
        </div>
        <div className='option'>
          <FaEllipsisV className='option-icon' />
        </div>
      </div>
      <div className='message-list'>
        {messages.map((message) => (
          <div className='message-item' key={message.id}>
            <div className='pp'>
              <img src={message.pp} alt=''></img>
            </div>
            <div className='message-body'>
              <div className='username'>{message.user}:</div>
              <div className='text'>{message.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='input-box'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Send a message'>
        </input>
        <div className='send' onClick={handleSend}>Chat</div>
      </div>
    </LiveChatContainer>
  );
};

export default LiveChat;
