import { LogInContainer } from "./Login.styled"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import Button from "../../commons/Button";
import EditInput from "../../commons/EditInput"
import ErrorAlert from "../../commons/ErrorAlert";
import CircleSpinner from "../../commons/CircleSpinner";
import { loginUser, resetLoginState } from "../../../stores/slices/authSlice";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LogIn = ({ onclose, onSignUp, onResetPass }) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLockLogin, setIsLockLogin] = useState(true);

    const { user } = useSelector((state) => state.auth);
    const { loginLoading, loginSuccess, loginError, loginMessage }
        = useSelector((state) => state.auth);

    useEffect(() => {
        setIsLockLogin(!password || !isValidEmail(email));
    }, [email, password]);

    useEffect(() => {
        if (user) window.location.reload();
    }, [user]);

    useEffect(() => {
        dispatch(resetLoginState());
    }, [dispatch]);

    const handleOnClickSignUp = () => {
        onclose();
        onSignUp();
    };

    const handleOnClickLogin = () => {
        if (password && isValidEmail(email)) {
            console.log(email, password);
            dispatch(loginUser({ email, password }));
        } else {

        }
    }

    const handleOnClickTrouble = () => {
        onclose();
        onResetPass();
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

    const handleOnEnterEmail = (e) => {
        if (e.target.value !== "") {
            document.querySelector("input[name='password']")?.focus();
        }
    }

    const handleOnEnterPassword = (e) => {
        if (e.target.value !== "") {
            handleOnClickLogin();
        }
    }


    return (
        <LogInContainer>
            {loginError && <ErrorAlert message={loginError} />}
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
                            Email
                        </div>
                        <div className="input">
                            <EditInput
                                name="email"
                                value={email}
                                onchange={handleOnChangeUsername}
                                onenter={handleOnEnterEmail}
                            />
                        </div>
                    </div>
                    <div className="password-input">
                        <div className="title">
                            Password
                        </div>
                        <div className="input">
                            <EditInput
                                name="password"
                                value={password}
                                onchange={handleOnChangePassword} type="password"
                                onenter={handleOnEnterPassword}
                            />
                        </div>
                    </div>
                    <div
                        className="trouble"
                        onClick={handleOnClickTrouble}
                    >
                        Trouble loggin in?
                    </div>
                </div>
                <div className="footer-container">
                    <Button
                        title={loginLoading ? <CircleSpinner size={20} /> : "Log In"}
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
