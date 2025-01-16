import { Icons } from "../../../assets/icons/Icon";
import { useEffect, useState } from "react";
import { Theme } from "../../../assets/styles/Theme";
import { SignUpContainer } from "./SignUp.styled";
import EditInput from "../../commons/EditInput"
import Button from "../../commons/Button";


const SignUp = ({ onclose, onLogin }) => {

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailInput, setEmailInput] = useState("");


    const handleOnChangeUsername = (e) => {
        setUsernameInput(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPasswordInput(e.target.value);
    };

    const handleOnChangeEmail = (e) => {
        setEmailInput(e.target.value);
    };

    const handleOnClickLogin = () => {
        onclose();
        onLogin();
    };


    return (
        <SignUpContainer>
            <div className="sign-up-form">
                <div className="close-icon" onClick={onclose}>
                    <Icons.Close />
                </div>
                <div className="header-container">
                    <div className="title-header">
                        <Icons.TwitchLogo className="t-icon" />
                        Join Twitch today
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
                                onchange={handleOnChangePassword}
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="email-input">
                        <div className="title">
                            Email
                        </div>
                        <div className="input">
                            <EditInput
                                value={emailInput}
                                onchange={handleOnChangeEmail}
                            />
                        </div>
                    </div>
                    <div className="term">
                        By clicking Sign Up, you are agreeing to Twitch’s <h4>Terms of Service</h4> and are acknowledging our <h4>Privacy Notice</h4> applies.
                    </div>
                </div>
                <div className="footer-container">
                    <Button title="Sign Up" color={Theme.highlight} styles="large" />
                    <div className="login" onClick={handleOnClickLogin}>
                        Have an account? Log in
                    </div>
                </div>
            </div>
        </SignUpContainer>
    );
};

export default SignUp;
