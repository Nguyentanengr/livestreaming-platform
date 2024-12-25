import { useDispatch } from "react-redux";
import { getSocket, getUserSession } from "./socketService"
import { getLiveSession } from "./streamSocketService";
import { setChatMessages } from "../../store/chatMessage";

let stompClient = null;

export const onChatMessage = (destination, dispatch) => {
    stompClient = getSocket();
    console.log(stompClient);
    
    if (stompClient && stompClient.connected) {
        console.log('Ready receive message from client ' + destination);
        stompClient.subscribe(destination, (response) => {
            const message = JSON.parse(response.body);
            console.log('receive message: ' + message);
            switch(message.action) {
                case 'JOIN_ROOM':
                    break;
                case 'NOTIS_SYSTEM':
                    break;
                case 'CHAT_MESSAGE':
                    receiveChatMessage(message, dispatch);
                    break;
            }
        });
    }
}

export const chatMessage = (content) => {
    const liveSession = getLiveSession();
    
    if (liveSession) {
        var message = {
            liveSessionId: liveSession,
            username: getUserSession(),
            content: content,
        }
        console.log('Send chat message to server', message);
        sendMessage(message, '/app/chat/message');
    }
}

export const receiveChatMessage = (message, dispatch) => {
    const chatMessage = {
        id: message.id,
        username: message.username,
        content: message.content,
        pp: message.pp,
        timestamp: message.timestamp,
    }
    console.log('Receive message from server', chatMessage);
    dispatch(setChatMessages(chatMessage))
}

export const sendMessage = (message, destination) => {
    const stompClient = getSocket();
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: destination,
            body: JSON.stringify(message),
        });
    }
}