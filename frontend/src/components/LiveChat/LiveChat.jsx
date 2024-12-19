import React, { useEffect, useState } from 'react';

import { HiLogout } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";

import { LiveChatContainer } from './LiveChat.styled';
import { chatMessage, onChatMessage } from '../../services/socketServices/chatSocketService';
import { useDispatch, useSelector } from 'react-redux';
import { getLiveSession } from '../../services/socketServices/streamSocketService';


const LiveChat = ({ liveSession }) => {

  const dispatch = useDispatch();
  const { chatMessages } = useSelector((state) => state.chatMessage);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      chatMessage(inputValue);
      setInputValue('');
    }
  }

  useEffect(() => {
    console.log('on chat message');
    onChatMessage('/topic/chat/' + liveSession.id, dispatch);
  }, [dispatch]);
  
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
        {chatMessages.map((message) => (
          <div className='message-item' key={message.id}>
            <div className='pp'>
              <img src={message.pp} alt=''></img>
            </div>
            <div className='message-body'>
              <div className='username'>{message.username}:</div>
              <div className='text'>{message.content}</div>
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
