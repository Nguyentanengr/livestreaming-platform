import { ChatPreviewContainer } from "./ChatPreview.styled"

import TitleBar from "../PresentPreview/TitleBar";
import { useState } from "react";

import { RiSettings3Line } from "react-icons/ri";

const ChatPreview = () => {

    const [messages, setMessages] = useState([
        { id: 1, user: 'Alatrey', text: '​​why she trying not to laugh', time: '2:09', pp: 'https://i.pravatar.cc/' },
        { id: 2, user: 'Mr_Bigls', text: 'Mahima finna go broke bro ', time: '2:11', pp: 'https://i.pravatar.cc/' },
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
        <ChatPreviewContainer>
            <TitleBar title={"Chat Preview"} />
            <div className="chat-box">
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
                    <div className="setting"><RiSettings3Line /></div>
                    <div className='send' onClick={handleSend}>Chat</div>
                </div>
            </div>
        </ChatPreviewContainer>
    )
}

export default ChatPreview;