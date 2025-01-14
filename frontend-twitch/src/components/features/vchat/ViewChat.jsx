import { useDispatch, useSelector } from "react-redux";
import { ViewChatContainer } from "./ViewChat.styled"
import SendComment from "../../commons/SendComment";
import ChatList from "../schat/ChatList";
import { addChat } from "../../../stores/slices/chatSlice"


const ViewChat = () => {

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
        <ViewChatContainer>
            <div className="title-chat">
                Stream Chat
            </div>
            <div className="chat-list">
                <ChatList />
            </div>
            <div className="chat-send">
                <SendComment ph="Send chat ..." onSendComment={handleSendChat} highlight={true} />
            </div>
        </ViewChatContainer>
    );
};

export default ViewChat;