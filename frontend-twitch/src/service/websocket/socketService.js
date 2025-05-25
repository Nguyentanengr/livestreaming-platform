import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from 'uuid';

let stompClient = null;
let userSession = null;

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


export const getUserSession = () => {
    if (!stompClient || !stompClient.connected) {
        throw new Error("STOMP client is not connected. Call connectSocket first.");
    }
    const us = localStorage.getItem('user-session');
    if (us) {
        console.log('Get user session from localStorage', us);
        userSession = us;
    } else {
        userSession = uuidv4();
        console.log('Generate user session by uuid ', userSession);
        localStorage.setItem('user-session', userSession);
    }
    return userSession;
}

export const clearUserSession = () => {
    userSession = null;
    localStorage.removeItem('user-session');
}
