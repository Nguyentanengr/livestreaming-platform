

import { useSelector } from "react-redux";
import { ChatListContainer } from "./ChatList.styled"
import Thumbnail from "../../commons/Thumbnail";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons/Icon";

const ChatList = () => {

    const list = useSelector((state) => state.chat.chats);


    const navigate = useNavigate();

    return (
        <ChatListContainer>
            {list.map(chat => {
                return <div className="chat-item" key={chat.id}>
                    <div className="thumbnail">
                        <Thumbnail src={chat.thumbnail} onclick={() => { navigate(`/profile/${chat.username}`) }} />
                    </div>
                    <div className="content">
                        <div className="username">{chat.username}:</div>
                        <div className="text">{chat.content}</div>
                    </div>
                    <div className="more-icon">
                        <Icons.More />
                    </div>
                </div>
            })}
        </ChatListContainer>
    );
};

export default ChatList;