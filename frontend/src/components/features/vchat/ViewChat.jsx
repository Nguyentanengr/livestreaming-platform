import { useDispatch, useSelector } from "react-redux";
import { ViewChatContainer } from "./ViewChat.styled";
import SendComment from "../../commons/SendComment";
import ChatList from "../schat/ChatList";
import { addChat } from "../../../stores/slices/chatSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { chatMessage, onChatMessage } from "../../../service/websocket/chatSocketService";

const ViewChat = () => {
    const dispatch = useDispatch();
    const { selectedStream } = useSelector((state) => state.stream);
    const { chats } = useSelector((state) => state.chat);
    const {user} = useSelector((state) => state.auth);

    const isLive = !selectedStream?.endedAt;
    const isChatEnabled = isLive && selectedStream?.commentEnabled;

    const handleSendChat = (input) => {
        if (isChatEnabled && user) {
            chatMessage(input);
        }
    };

    useEffect(() => {
        console.log('Starting subscribe /topic/chat/', selectedStream.id);
        onChatMessage('/topic/chat/' + selectedStream.id, dispatch);
    }, [dispatch, selectedStream]);

    return (
        <ViewChatContainer>
            <div className="title-chat">Stream Chat</div>
            <div className="chat-list">
                {isLive && <ChatList />}
                {!isLive && <div className="no-chat">No chat for ended stream</div>}
            </div>
            <div className="chat-send">
                <SendComment
                    ph="Send chat ..."
                    onSendComment={handleSendChat}
                    highlight={true}
                    disabled={!isChatEnabled}
                />
            </div>
        </ViewChatContainer>
    );
};

export default ViewChat;