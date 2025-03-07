import { ResetPasswordContainer } from "./ResetPassword.styled";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import { changePassUser, otpPassUser, resetChangePassState, resetOtpPassState }
    from "../../../stores/slices/authSlice";
import { onChangeCode, onChangeEmail, onChangeNewPassword }
    from "../../../stores/slices/inputResetPasswordSlice";

import ErrorAlert from "../../commons/ErrorAlert";
import CircleSpinner from "../../commons/CircleSpinner";
import Button from "../../commons/Button";


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const CODE_REGEX = /^\d{6}$/;

const ResetPassword = ({ onclose, onLogin, onSignUp }) => {

    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const [isSendedCode, setIsSendedCode] = useState(false);
    const [counter, setCounter] = useState(60);
    const [highlights, setHighlights] = useState({
        email: "",
        password: "",
        code: ""
    });
    const { user } = useSelector((state) => state.auth);
    const { email, newPassword, code } = useSelector((state) => state.inputResetPassword);
    const { otpPassLoading, otpPassSuccess, otpPassError, otpPassMessage } =
        useSelector((state) => state.auth);
    const { changePassLoading, changePassSuccess, changePassError, changePassMessage } =
        useSelector((state) => state.auth);


    useEffect(() => {
        if (otpPassError) {
            setIsSendedCode(false);
            startCount(60);
        }
    }, [otpPassError]);

    useEffect(() => {
        dispatch(resetOtpPassState());
        dispatch(resetChangePassState());
    }, [dispatch]);

    useEffect(() => {
        if (user) window.location.reload();
    }, [user])

    useEffect(() => {
        console.log(otpPassLoading, otpPassSuccess, otpPassError, otpPassMessage);
    }, [otpPassLoading, otpPassSuccess, otpPassError, otpPassMessage])


    const handleOnClickSendCode = () => {
        if (isValidEmail(email)) {
            if (!isSendedCode) {
                setIsSendedCode(true);
                startCount();
                // fetch
                dispatch(otpPassUser({ email }));
            }
        } else {
            setHighlights((prev) => ({ ...prev, ["email"]: "highlight" }))
        }
    };

    const handleOnClickLogin = () => {
        if (isValidEmail(email) && isValidCode(code) && isValidPassword(newPassword)) {
            // fetch
            dispatch(changePassUser({ email, newPassword, code }));
        }
    }

    const handleOnClickSignUp = () => {
        onclose();
        onSignUp();
    };

    // handle input action
    const handleOnKeyDown = (e) => {

        if (e.key === "Enter" && e.target.value !== "") {
            e.preventDefault();
            let named = e.target.name === "email" ? "password"
                : e.target.name === "password" ? "code" : "";
            if (named === "") {
                handleOnClickSignUp();
            }

            let selector = `input[name='${named}']`;
            document.querySelector(selector)?.focus();
        }
    };
    const handleOnBlurInput = (e) => {
        const { name, value } = e.target;

        setHighlights((prev) => {
            let highlightClass = "";
            let isValid = false;

            switch (name) {
                case "email":
                    isValid = EMAIL_REGEX.test(value) || !value || !value.trim();
                    highlightClass = isValid ? "" : "highlight";
                    break;
                case "password":
                    isValid = PASSWORD_REGEX.test(value) || !value || !value.trim();
                    highlightClass = isValid ? "" : "highlight";
                    break;
                case "code":
                    isValid = CODE_REGEX.test(value) || !value || !value.trim();
                    highlightClass = isValid ? "" : "highlight";
                    break;
            };
            return { ...prev, [name]: highlightClass };
        });
    };
    const handleOnFocusInput = (e) => {
        const { name } = e.target;
        setHighlights((prev) => ({ ...prev, [name]: "" }))
    };

    // handle validate input
    const isValidEmail = (email) => {
        return EMAIL_REGEX.test(email) && email !== "";
    };
    const isValidPassword = (password) => {
        return PASSWORD_REGEX.test(password) && password !== "";
    };
    const isValidCode = (code) => {
        return CODE_REGEX.test(code) && code !== "";
    };
    const handleConstraintInputCode = (e) => {
        console.log(e.target.value);

        if (!e.target.value || /^\d+$/.test(e.target.value)) {
            dispatch(onChangeCode(e.target.value))
        }
    }
    const handleOnMouseEnterSignup = (e) => {
        setIsLogin(isValidEmail(email) && isValidCode(code) && isValidPassword(newPassword));
    }
    const startCount = () => {
        setCounter(60);
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsSendedCode(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }

    return (
        <ResetPasswordContainer>
            {otpPassError && <ErrorAlert message={otpPassError} ></ErrorAlert>}
            {otpPassSuccess && <ErrorAlert message={otpPassMessage} type="success" ></ErrorAlert>}
            {changePassError && <ErrorAlert message={changePassError} ></ErrorAlert>}
            {changePassMessage && <ErrorAlert message={changePassMessage} type="success" ></ErrorAlert>}
            <div className="sign-up-form">
                <div className="close-icon" onClick={onclose}>
                    <Icons.Close />
                </div>
                <div className="header-container">
                    <div className="title-header">
                        <Icons.TwitchLogo className="t-icon" />
                        Reset your password
                    </div>
                </div>
                <div className="input-container">


                    <div className="email-input">
                        <div className="title">
                            Email
                        </div>
                        <div className="input">
                            <input
                                name="email"
                                onBlur={handleOnBlurInput}
                                onFocus={handleOnFocusInput}
                                type="text"
                                placeholder="Email address"
                                spellCheck={false}
                                value={email}
                                onChange={(e) => dispatch(onChangeEmail(e.target.value.trim()))}
                                onKeyDown={(e) => handleOnKeyDown(e)}
                            />
                        </div>
                    </div>
                    <div className={`error-email ${highlights.email}`}>
                        Enter a valid email address
                    </div>



                    <div className="password-input">
                        <div className="title">
                            New password
                        </div>
                        <div className="input">
                            <input
                                name="password"
                                onBlur={handleOnBlurInput}
                                onFocus={handleOnFocusInput}
                                type="password"
                                placeholder="Password"
                                spellCheck={false}
                                value={newPassword}
                                onChange={(e) => dispatch(onChangeNewPassword(e.target.value.trim()))}
                                onKeyDown={(e) => handleOnKeyDown(e)}
                            />
                        </div>
                    </div>
                    <div className={`error-password ${highlights.password}`}>
                        Please enter a stronger password (8 - 20 characters)
                    </div>



                    <div className="otp-input">
                        <div className="title">
                            OTP
                        </div>
                        <div className="input-send">
                            <div className="input">
                                <input
                                    name="code"
                                    onBlur={handleOnBlurInput}
                                    onFocus={handleOnFocusInput}
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    spellCheck={false}
                                    value={code}
                                    onChange={(e) => handleConstraintInputCode(e)}
                                    onKeyDown={(e) => handleOnKeyDown(e)}
                                />
                            </div>
                            <div className={`send ${isSendedCode ? "lock" : ""}`} onClick={handleOnClickSendCode}>
                                {otpPassLoading ? <CircleSpinner size={30} /> : isSendedCode ? `Resend ${counter}s` : "Send code"}
                            </div>
                        </div>
                    </div>


                    <div className={`error-code ${highlights.code}`}>
                        Enter 6-digit code
                    </div>
                </div>


                <div className="footer-container">
                    <Button
                        title={changePassLoading ? <CircleSpinner size={20} /> : "Login"}
                        color={Theme.highlight}
                        styles={`large ${isLogin ? "" : "lock"}`}
                        onMouseEnter={handleOnMouseEnterSignup}
                        onclick={handleOnClickLogin}
                    />
                    <div
                        className="sign-up"
                        onClick={handleOnClickSignUp}
                    >
                        Don't have an account? Sign up
                    </div>
                </div>
            </div>
        </ResetPasswordContainer>
    );
};

export default ResetPassword;
