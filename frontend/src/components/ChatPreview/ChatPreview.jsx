import { ChatPreviewContainer } from "./ChatPreview.styled"

import TitleBar from "../PresentPreview/TitleBar";
import { useEffect, useState } from "react";
import { RiSettings3Line } from "react-icons/ri";
import { chatMessage, onChatMessage } from "../../services/socketServices/chatSocketService";
import { useDispatch, useSelector } from "react-redux";

var isPresent = false;
var dispatch = null;

export const setOnChatMessage = (liveSessionId) => {
    isPresent = true;
    console.log('on chat message');
    onChatMessage('/topic/chat/' + liveSessionId, dispatch);
}

const ChatPreview = () => {

    dispatch = useDispatch();
    const { chatMessages } = useSelector((state) => state.chatMessage);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim() && isPresent) {
            chatMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <ChatPreviewContainer>
            <TitleBar title={"Chat Preview"} />
            <div className="chat-box">
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
                    <div className="setting"><RiSettings3Line /></div>
                    <div className='send' onClick={handleSend}>Chat</div>
                </div>
            </div>
        </ChatPreviewContainer>
    )
}

export default ChatPreview;