import { useDispatch, useSelector } from "react-redux";
import { ViewChatContainer } from "./ViewChat.styled";
import SendComment from "../../commons/SendComment";
import ChatList from "../schat/ChatList";
import { addChat } from "../../../stores/slices/chatSlice";
import { toast } from "react-toastify";

const ViewChat = () => {
    const dispatch = useDispatch();
    const { selectedStream } = useSelector((state) => state.stream);
    const { chats } = useSelector((state) => state.chat);
    const user = useSelector((state) => state.user.user);

    const isLive = !selectedStream?.endedAt;
    const isChatEnabled = isLive && selectedStream?.commentEnabled;

    const handleSendChat = (input) => {
        if (isChatEnabled && user) {
            dispatch(addChat({
                id: chats.length + 1,
                username: user.username,
                thumbnail: user.thumbnail,
                content: input,
            }));
        } else if (!isLive) {
            // toast.error("Cannot chat on ended stream.", {
            //     position: "top-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            // });
        }
    };

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