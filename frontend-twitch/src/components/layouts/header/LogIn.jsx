import { Icons } from "../../../assets/icons/Icon";
import { LogInContainer } from "./Login.styled"
import { useEffect, useState } from "react";
import EditInput from "../../commons/EditInput"
import Button from "../../commons/Button";
import { Theme } from "../../../assets/styles/Theme";

const LogIn = ({ onclose, onSignUp }) => {

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleOnChangeUsername = (e) => {
        setUsernameInput(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPasswordInput(e.target.value);
    };

    const handleOnClickSignUp = () => {
        onclose();
        onSignUp();
    };


    return (
        <LogInContainer>
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
                                value={usernameInput}
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
                                value={passwordInput}
                                onchange={handleOnChangePassword} type="password"
                            />
                        </div>
                    </div>
                    <div className="trouble">
                        Trouble loggin in?
                    </div>
                </div>
                <div className="footer-container">
                    <Button title="Log In" color={Theme.highlight} styles="large" />
                    <div className="sign-up" onClick={handleOnClickSignUp}>
                        Don't have an account? Sign up
                    </div>
                </div>
            </div>
        </LogInContainer>
    );
};

export default LogIn;
