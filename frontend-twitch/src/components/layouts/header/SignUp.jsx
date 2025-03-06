import { Icons } from "../../../assets/icons/Icon";
import { useEffect, useState } from "react";
import { Theme } from "../../../assets/styles/Theme";
import { SignUpContainer } from "./SignUp.styled";
import Button from "../../commons/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { onChangeCode, onChangeEmail, onChangePassword } from "../../../stores/slices/inputSignUpSlice";
import { registerUser, requestOTP, resetAuthState } from "../../../stores/slices/authSlice";
import ErrorAlert from "../../commons/ErrorAlert";
import CircleSpinner from "../../commons/CircleSpinner";
import { useNavigate } from "react-router-dom";


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const CODE_REGEX = /^\d{6}$/;

const SignUp = ({ onclose, onLogin }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSendedCode, setIsSendedCode] = useState(false);
    const [counter, setCounter] = useState(60);
    const [highlights, setHighlights] = useState({
        email: "",
        password: "",
        code: ""
    });
    const { email, password, code } = useSelector((state) => state.inputSignUp);
    const { otpLoading, otpError, otpSuccess,
         message, authError, authSuccess } = useSelector((state) => state.auth);




    useEffect(() => {
        if (otpError) {
            setIsSendedCode(false);
            startCount(60);  
        }
    }, [otpError]);


    useEffect(() => {
        dispatch(resetAuthState());
    }, [dispatch]);

    useEffect(() => {
        if (authSuccess) window.location.reload();
    }, [navigate, authSuccess])




    const handleOnClickSendCode = () => {
        if (isValidEmail(email)) {
            if (!isSendedCode) {
                setIsSendedCode(true);
                startCount();
                // fetch
                dispatch(requestOTP({email}));
            }
        } else {
            setHighlights((prev) => ({ ...prev, ["email"]: "highlight" }))
        }
    };

    const handleOnClickSignUp = () => {
        if (isValidEmail(email) && isValidCode(code) && isValidPassword(password)) {
            // fetch
            dispatch(registerUser({email, password, code}));
        }
    }

    const handleOnClickLogin = () => {
        onclose();
        onLogin();
    };

    // handle input 
    const handleOnKeyDownCode = (e) => {

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

    const handleOnKeyDownEmail = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {

        }
    }





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
        setIsSignUp(isValidEmail(email) && isValidCode(code) && isValidPassword(password));
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
        <SignUpContainer>
            {otpError && <ErrorAlert message={otpError} ></ErrorAlert>}
            {authError && <ErrorAlert message={authError} ></ErrorAlert>}
            {otpSuccess && <ErrorAlert message={message} type="success" ></ErrorAlert>}
            {authSuccess && <ErrorAlert message={message} type="success" ></ErrorAlert>}
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
                                onKeyDown={(e) => handleOnKeyDownCode(e)}
                            />
                        </div>
                    </div>
                    <div className={`error-email ${highlights.email}`}>
                        Enter a valid email address
                    </div>

                    <div className="password-input">
                        <div className="title">
                            Password
                        </div>
                        <div className="input">
                            <input
                                name="password"
                                onBlur={handleOnBlurInput}
                                onFocus={handleOnFocusInput}
                                type="password"
                                placeholder="Password"
                                spellCheck={false}
                                value={password}
                                onChange={(e) => dispatch(onChangePassword(e.target.value.trim()))}
                                onKeyDown={(e) => handleOnKeyDownCode(e)}
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
                                    onKeyDown={(e) => handleOnKeyDownCode(e)}
                                />
                            </div>
                            <div className={`send ${isSendedCode ? "lock" : ""}`} onClick={handleOnClickSendCode}>
                                {otpLoading ? <CircleSpinner size={30} /> : isSendedCode ? `Resend ${counter}s` : "Send code"}
                            </div>
                        </div>
                    </div>
                    <div className={`error-code ${highlights.code}`}>
                        Enter 6-digit code
                    </div>
                    <div className="term">
                        By clicking Sign Up, you are agreeing to Twitch’s <h4>Terms of Service</h4> and are acknowledging our <h4>Privacy Notice</h4> applies.
                    </div>
                </div>
                <div className="footer-container">
                    <Button
                        title="Sign Up"
                        color={Theme.highlight}
                        styles={`large ${isSignUp ? "" : "lock"}`}
                        onMouseEnter={handleOnMouseEnterSignup}
                        onclick={handleOnClickSignUp}
                    />
                    <div
                        className="login"
                        onClick={handleOnClickLogin}
                    >
                        Have an account? Log in
                    </div>
                </div>
            </div>
        </SignUpContainer>
    );
};

export default SignUp;
