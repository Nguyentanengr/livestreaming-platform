import React, { useState } from 'react';

import { HiLogout } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";

import { LiveChatContainer } from './LiveChat.styled';

const LiveChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alatrey', text: '​​why she trying not to laugh', time: '2:09', pp: 'https://i.pravatar.cc/' },
    { id: 2, user: 'Mr_Bigls', text: 'Mahima finna go broke bro tryna get a shoutout', time: '2:11', pp: 'https://i.pravatar.cc/' },
    { id: 3, user: 'snowden_88', text: '​​ Nah this last with her mom is crazy', time: '2:12', pp: 'https://i.pravatar.cc/' },
    { id: 4, user: 'snowden_88', text: '​​ Nah this last with her mom is crazy', time: '2:12', pp: 'https://i.pravatar.cc/' },
    { id: 5, user: 'snowden_88', text: '​​ Nah this last with her mom is crazy', time: '2:12', pp: 'https://i.pravatar.cc/' },
    { id: 6, user: 'snowden_88', text: '​​ Nah this last with her mom is crazy', time: '2:12', pp: 'https://i.pravatar.cc/' },
    { id: 7, user: 'snowden_88', text: '​​ Nah this last with her mom is crazy', time: '2:12', pp: 'https://i.pravatar.cc/' },
    { id: 8, user: 'snowden_88', text: '​​ Nah this last with her mom is crazy', time: '2:12', pp: 'https://i.pravatar.cc/' },
    { id: 9, user: 'snowden_88', text: '​​ Nah this last with her mom is crazy', time: '2:12', pp: 'https://i.pravatar.cc/' },
    { id: 10, user: 'snowden_88', text: '​​ Nah this last with her mom is crazy', time: '2:12', pp: 'https://i.pravatar.cc/' },
    { id: 11, user: 'snowden_88', text: '​​ Nah this last with her mom is crazy', time: '2:12', pp: 'https://i.pravatar.cc/' },
    { id: 12, user: 'snowden_88', text: '​​ Nah this last with her mom is crazy', time: '2:12', pp: 'https://i.pravatar.cc/' },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        text: inputValue,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

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
