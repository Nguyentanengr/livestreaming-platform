import { RightHeaderContainer } from "./RightHeader.styled";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Icons } from "../../../assets/icons/Icon";
import { Theme } from "../../../assets/styles/Theme";
import { useNavigate } from "react-router-dom";
import ProfileItem from "../../commons/ProfileItem";
import Thumbnail from "../../commons/Thumbnail";
import Button from "../../commons/Button";
import NotificationBox from "./NotificationBox";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { logoutUser, resetAuthState } from "../../../stores/slices/authSlice";
import ResetPassword from "./ResetPassword";


const RightHeader = () => {

    const [exProfile, setExProfile] = useState(false);
    const [exNotification, setExNotification] = useState(false);
    const [exLogin, setExLogin] = useState(false);
    const [exSignUp, setExSignUp] = useState(false);
    const [exResetPass, setExResetPass] = useState(false);
    const [count, setCount] = useState(1);
    const profileRef = useRef(null);
    const notificationRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null;

    const { thumbnail, nickname } = user ? user
        : { thumbnail: "images/avatar-default.png", nickname: "" }

    const handleOnClickLogin = () => {
        setExLogin(!exLogin);
        setExProfile(false);
    };

    const handleOnClickSignUp = () => { // button login
        setExSignUp(!exSignUp);
    };

    const handleOnClickResetPass = () => {
        setExResetPass(!exResetPass);
    }

    const handleOnClickLogout = () => {
        dispatch(logoutUser())
            .then(() => {
                dispatch(resetAuthState());
                setExProfile(false);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Listen to click outside
    useEffect(() => {
        console.log(user);
        const handleOutsideClick = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setExProfile(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setExNotification(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [user]);

    return (
        <RightHeaderContainer>
            {exSignUp &&
                <SignUp
                    onclose={handleOnClickSignUp}
                    onLogin={handleOnClickLogin}
                />}
            {exLogin &&
                <LogIn
                    onclose={handleOnClickLogin}
                    onSignUp={handleOnClickSignUp}
                    onResetPass={handleOnClickResetPass}
                />}
            {exResetPass &&
                <ResetPassword
                    onclose={handleOnClickResetPass}
                    onLogin={handleOnClickLogin}
                    onSignUp={handleOnClickSignUp}
                />}
            <div className="action-container">
                {!user && <Button color={Theme.highlight} styles="large" title="Login" onclick={handleOnClickLogin} />}
                {user && <div className="notification-container">
                    <div className="notification-icon" onClick={() => { setExNotification(!exNotification) }}>
                        <Icons.Notification />
                        <span className="notification-count">{count < 99 ? count : "99+"}</span>
                    </div>
                    {exNotification && <NotificationBox refer={notificationRef} />}
                </div>
                }
                <div className="profile-container">
                    <Thumbnail src={thumbnail} onclick={() => setExProfile(!exProfile)} />
                    {exProfile && <div className="profile-menu-container" ref={profileRef}>

                        <div className="avatar-container">
                            <Thumbnail src={thumbnail} size="large" onclick={() => navigate("/my-channel")} />
                            <div className="profile-name">{nickname}</div>
                        </div>
                        <hr />
                        <div className="profile-menu">
                            {user ? <>
                                <ProfileItem
                                    icon={<Icons.Channel />}
                                    title="Channel"
                                    onclick={() => { navigate("/my-chanel") }}
                                />
                                <ProfileItem
                                    icon={<Icons.Creator />}
                                    title="Creator"
                                    onclick={() => { }}
                                />
                                <ProfileItem
                                    icon={<Icons.Analytics />}
                                    title="Analytics Dashboard"
                                    onclick={() => { }}
                                />
                                <ProfileItem
                                    icon={<Icons.Privacy />}
                                    title="Privacy"
                                    onclick={() => { }} />
                                <hr />
                                <ProfileItem
                                    icon={<Icons.Logout />}
                                    title="Log Out"
                                    onclick={handleOnClickLogout}
                                />
                            </>
                                : <>
                                    <ProfileItem
                                        icon={<Icons.LogIn />}
                                        title="Log In"
                                        onclick={handleOnClickLogin}
                                    />
                                </>}
                        </div>
                    </div>}
                </div>
            </div>

        </RightHeaderContainer>
    )
};

export default RightHeader;