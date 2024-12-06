import { Client } from "@stomp/stompjs";

let stompClient = null;

export const getSocket = () => {
    if (!stompClient || !stompClient.connected) {
        throw new Error("STOMP client is not connected. Call connectSocket first.");
    }
    return stompClient;
};

export const connectSocket = (url) => {

    if (!stompClient) {
        const socket = new WebSocket(url);
        stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                
                console.log("Connected to WebSocket via STOMP");
            },
            onDisconnect: () => {
                console.log("Disconnected from WebSocket");
            },
        });
        stompClient.activate();
    }
    return stompClient;
};

export const disconnectSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
    }
}