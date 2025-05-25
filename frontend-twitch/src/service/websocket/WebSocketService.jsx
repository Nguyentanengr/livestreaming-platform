import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import { toast } from 'react-toastify';
import { setUnreadCount } from '../../stores/slices/notiSlice';
import { v4 as uuidv4 } from 'uuid';
import './ToastCustom.css';

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8080/ws';

let stompClient = null;
let userSession = null;

export const disconnectSocket = () => {
  if (stompClient) {
      stompClient.deactivate();
      stompClient = null;
      console.log("Websocket is disconnected by action");
  }
}

const WebSocketService = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);

  useEffect(() => {
    console.log("Starting connect websocket");
    userSession = uuidv4();
    console.log("Created user session with identity: ", userSession);
    stompClient = new Client({
      brokerURL: WS_BASE_URL,
      reconnectDelay: 5000, // Tự động reconnect sau 5s nếu mất kết nối
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log('WebSocket connected');
      if (user?.id) {
        console.log("Subcribe notification topic when user was loggon");
        stompClient.subscribe(`/queue/notifications-${user.id}`, (message) => {
          try {
            const notification = JSON.parse(message.body);
            if (notification.type === 'LIKE_REEL' || notification.type === 'COMMENT'
              || notification.type === 'LIKE_COMMENT' || notification.type === 'FOLLOW') {
              // Tăng unreadCount
              console.log('current unreadCount:', unreadCount);
              dispatch((dispatch, getState) => {
                const { notifications: { unreadCount } } = getState();
                console.log('Current unreadCount:', unreadCount);
                dispatch(setUnreadCount(unreadCount + 1));
              });

              // Hiển thị toast
              toast.info(
                ({ closeToast }) => (
                  <div className="custom-toast">
                    <img
                      src={notification.user.avatar || '/images/avatar-default.jpeg'}
                      alt="User avatar"
                      className="toast-avatar"
                    />
                    <div className="toast-content">
                      {notification.content}
                    </div>
                  </div>
                ),
                {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false, // Hiển thị thanh tiến trình
                  progressClassName: 'toast-progress', // Class tùy chỉnh cho thanh tiến trình
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  icon: false,
                }
              );
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        });
      }
    };










    // Khong quan trong

    stompClient.onStompError = (frame) => {
      console.error('STOMP error:', frame);
    };

    stompClient.onWebSocketClose = () => {
      console.log('WebSocket disconnected');
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      console.log('WebSocket disconnected on cleanup');
    };
  }, [user, dispatch]);

  return null;
};

export default WebSocketService;