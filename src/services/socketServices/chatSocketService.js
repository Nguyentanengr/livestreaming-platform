import { getSocket } from "./socketService"


export const sendMessage = (message, destination) => {
    const stompClient = getSocket();
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: destination,
            body: JSON.stringify(message),
        });
    }
}

export const receiveMessage = (destination, callback) => {
    const stompClient = getSocket();
    if (stompClient && stompClient.connected) {
        stompClient.subscribe(destination, (message) => {
            const data = JSON.parse(message.body);
            callback(data);
        });
    }
};