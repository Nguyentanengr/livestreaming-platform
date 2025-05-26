import { useDispatch } from "react-redux";
import { getSocket, getUserSession } from "./socketService"
import { getStreamId } from "./streamSocketService";
import { addChat } from "../../stores/slices/chatSlice";
import { setViewersCount } from "../../stores/slices/streamSlice";


let stompClient = null;


export const onViewMessage = (destination, callback) => {
    stompClient = getSocket();
    console.log(stompClient);

    if (stompClient && stompClient.connected) {
        console.log('Ready receive message from client ' + destination);

        stompClient.subscribe(destination, (response) => {
            const message = JSON.parse(response.body);
            console.log('[VIEW MESSAGE] receive message: ' + message);
            callback(message);
        });
    }
}




export const onChatMessage = (destination, dispatch) => {
    stompClient = getSocket();
    console.log(stompClient);

    if (stompClient && stompClient.connected) {
        console.log('Ready receive message from client ' + destination);

        stompClient.subscribe(destination, (response) => {
            const message = JSON.parse(response.body);
            console.log('receive message: ' + message);
            receiveChatMessage(message, dispatch);
        });
    }
}

export const chatMessage = (content) => {
    const streamId = getStreamId();

    if (streamId) {
        var message = {
            streamId: streamId,
            userSessionId: getUserSession(),
            content: content,
        }
        console.log('Send chat message to server', message);
        sendMessage(message, '/app/chat/message');
    }
}

export const receiveChatMessage = (message, dispatch) => {
    const chatMessage = {
        id: message.id,
        content: message.content,
        createdAt: message.createdAt,
        user: message.user
    }
    console.log('Receive message from server', chatMessage);
    dispatch(addChat(chatMessage));
}


export const sendMessage = (message, destination) => {
    const stompClient = getSocket();
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: destination,
            body: JSON.stringify(message),
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
    }
}