import { ChatPreviewContainer } from "./ChatPreview.styled"
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../../stores/slices/chatSlice";
import TitleBar from "../../commons/TitleBar";
import ChatList from "./ChatList";
import SendChat from "./SendChat";
import SendComment from "../../commons/SendComment";
import Thumbnail from "../../commons/Thumbnail";

const ChatPreview = () => {

    const dispatch = useDispatch();
    const list = useSelector((state) => state.chat.chats);
    const user = useSelector((state) => state.user.user);

    const handleSendChat = (input) => {
        dispatch(addChat({
            id: list.length + 1,
            username: user.username,
            thumbnail: user.thumbnail,
            content: input,
        }));
    };


    return (
        <ChatPreviewContainer>
            <TitleBar title="Chat Preview"/>
            <div className="chat-list">
                <ChatList />
            </div>
            <div className="send-chat">
                <SendComment ph="Send chat ..." onSendComment={handleSendChat} highlight={true}/>
            </div>
        </ChatPreviewContainer>
    );
};

export default ChatPreview;