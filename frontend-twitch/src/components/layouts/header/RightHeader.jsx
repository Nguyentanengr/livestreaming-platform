import { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import { resetAuthState } from "../../../stores/slices/authSlice";
import Button from "../../commons/Button";
import Thumbnail from "../../commons/Thumbnail";
import ProfileItem from "../../commons/ProfileItem";
import NotificationBox from "./NotificationBox";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import { RightHeaderContainer } from "./RightHeader.styled";
import { logoutUser } from "../../../service/api/authApi";
import { fetchUnreadNotificationCount } from "../../../service/api/notiApi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebSocketService from "../../../service/websocket/WebSocketService";
import { getNotification } from "../../../service/websocket/notiSocketService";
import { setUnreadCount } from "../../../stores/slices/notiSlice";

const RightHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profileRef = useRef(null);
    const notificationRef = useRef(null);
    const { unreadCount } = useSelector((state) => state.notifications);
    const { user } = useSelector((state) => state.auth, shallowEqual);

    const [modals, setModals] = useState({
        profile: false,
        notification: false,
        login: false,
        signUp: false,
        resetPassword: false,
    });

    const { avatar, username } = user
        ? user
        : { avatar: "/images/avatar-default.jpeg", username: "" };

    const toggleModal = (modalName) => {
        setModals((prev) => ({
            ...prev,
            [modalName]: !prev[modalName],
            ...(modalName !== 'profile' && { profile: false }),
        }));
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            dispatch(resetAuthState());
            setModals((prev) => ({ ...prev, profile: false }));
            window.location.reload();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
        setModals((prev) => ({ ...prev, profile: false }));
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setModals((prev) => ({ ...prev, profile: false }));
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setModals((prev) => ({ ...prev, notification: false }));
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    useEffect(() => {
        dispatch(fetchUnreadNotificationCount());
    }, [dispatch, user]);

    useEffect(() => {
        setTimeout(() => {
            if (user) getNotification((message) => {
                try {
                    console.log("Receive message on notification topic ", message);
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
            })
        }, 1000);
    }, [])

    return (
        <RightHeaderContainer>
            {modals.signUp && (
                <SignUp
                    onclose={() => toggleModal('signUp')}
                    onLogin={() => toggleModal('login')}
                />
            )}
            {modals.login && (
                <LogIn
                    onclose={() => toggleModal('login')}
                    onSignUp={() => toggleModal('signUp')}
                    onResetPass={() => toggleModal('resetPassword')}
                />
            )}
            {modals.resetPassword && (
                <ResetPassword
                    onclose={() => toggleModal('resetPassword')}
                    onLogin={() => toggleModal('login')}
                    onSignUp={() => toggleModal('signUp')}
                />
            )}
            <div className="action-container">
                {!user && (
                    <Button
                        color={Theme.highlight}
                        styles="medium"
                        title="Login"
                        onclick={() => toggleModal('login')}
                    />
                )}
                {user && (
                    <div className="notification-container">
                        <div
                            className="notification-icon"
                            onClick={() => toggleModal('notification')}
                        >
                            <Icons.Notification />
                            {unreadCount > 0 && <span className="notification-count">
                                {unreadCount < 9 ? unreadCount : "9+"}
                            </span>}
                        </div>
                        {modals.notification && <NotificationBox refer={notificationRef} />}
                    </div>
                )}
                <div className="profile-container">
                    <Thumbnail
                        src={avatar}
                        onclick={() => toggleModal('profile')}
                        size="small"
                    />
                    {modals.profile && (
                        <div className="profile-menu-container" ref={profileRef}>
                            <div className="avatar-container">
                                <Thumbnail
                                    src={avatar}
                                    size="medium"
                                    onclick={() => handleNavigate("/you")}
                                />
                                <div className="profile-name">{username}</div>
                            </div>
                            <hr />
                            <div className="profile-menu">
                                {user ? (
                                    <>
                                        <ProfileItem
                                            icon={<Icons.Channel />}
                                            title="Channel"
                                            onclick={() => handleNavigate("/you")}
                                        />
                                        <ProfileItem
                                            icon={<Icons.Creator />}
                                            title="Creator"
                                            onclick={() => handleNavigate("/creator")}
                                        />
                                        <ProfileItem
                                            icon={<Icons.Analytics />}
                                            title="Analytics Dashboard"
                                            onclick={() => handleNavigate("/creator/analytics")}
                                        />
                                        <ProfileItem
                                            icon={<Icons.Privacy />}
                                            title="Privacy"
                                            onclick={() => handleNavigate("/privacy")}
                                        />
                                        <hr />
                                        <ProfileItem
                                            icon={<Icons.Logout />}
                                            title="Log Out"
                                            onclick={handleLogout}
                                        />
                                    </>
                                ) : (
                                    <ProfileItem
                                        icon={<Icons.LogIn />}
                                        title="Log In"
                                        onclick={() => toggleModal('login')}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
            />
        </RightHeaderContainer>
    );
};

export default RightHeader;