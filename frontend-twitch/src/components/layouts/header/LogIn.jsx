import { Icons } from "../../../assets/icons/Icon";
import { LogInContainer } from "./Login.styled"
import { useEffect, useState } from "react";
import EditInput from "../../commons/EditInput"
import Button from "../../commons/Button";
import { Theme } from "../../../assets/styles/Theme";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthState } from "../../../stores/slices/authSlice";
import ErrorAlert from "../../commons/ErrorAlert";
import CircleSpinner from "../../commons/CircleSpinner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LogIn = ({ onclose, onSignUp }) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLockLogin, setIsLockLogin] = useState(true);

    const { authLoading, authError, authSuccess, message }
        = useSelector((state) => state.auth);

    useEffect(() => {

        if (!password || !isValidEmail(email)) {
            setIsLockLogin(true);
        } else {
            setIsLockLogin(false);
        }

    }, [email, password]);

    useEffect(() => {
        if (authSuccess) window.location.reload();
    }, [authSuccess]);

    useEffect(() => {
        dispatch(resetAuthState());
    }, [dispatch]);

    const handleOnClickSignUp = () => {
        onclose();
        onSignUp();
    };

    const handleOnClickLogin = () => {
        if (password && isValidEmail(email)) {
            console.log(email, password);
            
            dispatch(loginUser({ email, password }));
        }
    }

    const handleOnChangeUsername = (e) => {
        setEmail(e.target.value.trim());
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value.trim());
    };

    const isValidEmail = (email) => {
        return EMAIL_REGEX.test(email) && email !== "";
    };

    return (
        <LogInContainer>
            {authError && <ErrorAlert message={authError} />}
            <div className="login-form">
                <div className="close-icon" onClick={onclose}>
                    <Icons.Close />
                </div>
                <div className="header-container">
                    <div className="title-header">
                        <Icons.TwitchLogo className="t-icon" />
                        Log in to Twitch
                    </div>
                </div>
                <div className="input-container">
                    <div className="username-input">
                        <div className="title">
                            Username
                        </div>
                        <div className="input">
                            <EditInput
                                value={email}
                                onchange={handleOnChangeUsername}
                            />
                        </div>
                    </div>
                    <div className="password-input">
                        <div className="title">
                            Password
                        </div>
                        <div className="input">
                            <EditInput
                                value={password}
                                onchange={handleOnChangePassword} type="password"
                            />
                        </div>
                    </div>
                    <div className="trouble">
                        Trouble loggin in?
                    </div>
                </div>
                <div className="footer-container">
                    <Button
                        title={authLoading ? <CircleSpinner size={20}/> : "Log In"}
                        color={Theme.highlight}
                        styles={`large ${isLockLogin ? "lock" : ""}`}
                        onclick={handleOnClickLogin}
                    />
                    <div className="sign-up" onClick={handleOnClickSignUp}>
                        Don't have an account? Sign up
                    </div>
                </div>
            </div>
        </LogInContainer>
    );
};

export default LogIn;
