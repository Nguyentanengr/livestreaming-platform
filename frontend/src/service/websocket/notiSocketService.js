import { setUnreadCount } from "../../stores/slices/notiSlice";
import { getSocket } from "./socketService";



let stompClient = null;
let user = null;

export const getNotification = (callback) => {
    stompClient = getSocket();
    user = JSON.parse(localStorage.getItem('user'));
    if (user && stompClient && stompClient.connected) {
        console.log("Starting subcribe notification topic at queue/notifications-", user.id);
        stompClient.subscribe(`/queue/notifications-${user.id}`, callback);
        console.log("Started subcribe notification topic!");
    }

}