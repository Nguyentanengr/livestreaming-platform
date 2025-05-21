

import { useSelector } from "react-redux";
import { ChatListContainer } from "./ChatList.styled"
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Thumbnail from "../../commons/Thumbnail";

const ChatList = () => {

    const list = useSelector((state) => state.chat.chats);

    const navigate = useNavigate();
    const containerRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        let lastItem = list[list.length - 1].id;
        containerRef.current.scrollTo({
            top: itemRefs.current[lastItem].offsetTop,
            behavior: "smooth",
        })
    }, [list])

    return (
        <ChatListContainer ref={containerRef}>
            {list.map(chat => {
                return <div className="chat-item" key={chat.id} ref={el => itemRefs.current[chat.id] = el}>
                    <div className="thumbnail">
                        <Thumbnail src={chat.thumbnail} onclick={() => { navigate(`/profile/${chat.username}`) }} size={'small'}/>
                    </div>
                    <div className="content">
                        <div className="box">
                            <div className="username">{chat.username}</div>
                            <div className="text">{chat.content}</div>
                        </div>
                    </div>
                    {/* <div className="more-icon">
                        <Icons.More />
                    </div> */}
                </div>
            })}
        </ChatListContainer>
    );
};

export default ChatList;