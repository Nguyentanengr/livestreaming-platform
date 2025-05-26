import { ChatPreviewContainer } from "./ChatPreview.styled"
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../../stores/slices/chatSlice";
import TitleBar from "../../commons/TitleBar";
import ChatList from "./ChatList";
import SendComment from "../../commons/SendComment";
import { v4 as uuidv4 } from "uuid";
import { chatMessage, onChatMessage } from "../../../service/websocket/chatSocketService";

var isPresent = false;
var dispatch = null;

export const setOnChatMessage = (streamId) => {
    isPresent = true;
    console.log('on chat message');
    onChatMessage('/topic/chat/' + streamId, dispatch);
}

const ChatPreview = () => {

    dispatch = useDispatch();
    const list = useSelector((state) => state.chat.chats);
    const { user } = useSelector((state) => state.auth);

    const handleSendChat = (input) => {
        if (input.trim()) {
            if (isPresent) {
                console.log("send chat message to server ! ");
                chatMessage(input);
            }
        }
    };


    return (
        <ChatPreviewContainer>
            <TitleBar title="Chat Preview" />
            <div className="chat-list">
                <ChatList />
            </div>
            <div className="send-chat">
                <SendComment ph="Send chat ..." onSendComment={handleSendChat} highlight={true} />
            </div>
        </ChatPreviewContainer>
    );
};

export default ChatPreview;