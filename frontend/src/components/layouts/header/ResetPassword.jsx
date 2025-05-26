import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import { resetOtpPasswordState, resetResetPasswordState } from "../../../stores/slices/authSlice";
import ErrorAlert from "../../commons/ErrorAlert";
import CircleSpinner from "../../commons/CircleSpinner";
import Button from "../../commons/Button";
import { ResetPasswordContainer } from "./ResetPassword.styled";
import { REGEXS } from "../../../utils/regex";
import { otpResetPassword, resetPassword } from "../../../service/api/authApi";


const ResetPassword = ({ onclose, onLogin, onSignUp }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, otpPasswordLoading, otpPasswordError, resetPasswordLoading, resetPasswordError } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        code: "",
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [counter, setCounter] = useState(60);
    const [highlights, setHighlights] = useState({
        email: "",
        newPassword: "",
        code: "",
    });

    useEffect(() => {
        const isValid = REGEXS.EMAIL_REGEX.test(formData.email.trim()) &&
                       REGEXS.PASSWORD_REGEX.test(formData.newPassword.trim()) &&
                       REGEXS.CODE_REGEX.test(formData.code.trim());
        setIsFormValid(isValid);
    }, [formData]);

    useEffect(() => {
        if (user) {
            window.location.reload();
        }
        return () => {
            dispatch(resetOtpPasswordState());
            dispatch(resetResetPasswordState());
        };
    }, [user, dispatch]);

    useEffect(() => {
        if (otpPasswordError) {
            setIsCodeSent(false);
            setCounter(60);
        }
    }, [otpPasswordError]);

    const startCountdown = () => {
        setCounter(60);
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsCodeSent(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value.trim();
        if (name === "code" && newValue && !/^\d+$/.test(newValue)) {
            return;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        let isValid = true;
        switch (name) {
            case "email":
                isValid = REGEXS.EMAIL_REGEX.test(value.trim()) || !value;
                break;
            case "newPassword":
                isValid = REGEXS.PASSWORD_REGEX.test(value.trim()) || !value;
                break;
            case "code":
                isValid = REGEXS.CODE_REGEX.test(value.trim()) || !value;
                break;
        }
        setHighlights((prev) => ({
            ...prev,
            [name]: isValid ? "" : "highlight",
        }));
    };

    const handleInputFocus = (e) => {
        const { name } = e.target;
        setHighlights((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key !== "Enter" || !e.target.value.trim()) return;
        e.preventDefault();
        const fieldOrder = ["email", "newPassword", "code"];
        const currentIndex = fieldOrder.indexOf(e.target.name);
        if (currentIndex === fieldOrder.length - 1) {
            handleResetPassword();
        } else {
            const nextField = fieldOrder[currentIndex + 1];
            document.querySelector(`input[name="${nextField}"]`)?.focus();
        }
    };

    const handleSendCode = () => {
        if (REGEXS.EMAIL_REGEX.test(formData.email.trim()) && !isCodeSent) {
            setIsCodeSent(true);
            startCountdown();
            dispatch(otpResetPassword({ email: formData.email }));
        } else {
            setHighlights((prev) => ({ ...prev, email: "highlight" }));
        }
    };

    const handleResetPassword = () => {
        if (isFormValid) {
            dispatch(resetPassword(formData));
        }
    };

    const handleSignUp = () => {
        onclose();
        onSignUp();
    };

    const handleLogin = () => {
        onclose();
        onLogin();
    };

    return (
        <ResetPasswordContainer>
            {otpPasswordError && <ErrorAlert message={otpPasswordError.message || "Failed to send OTP"} />}
            {resetPasswordError && <ErrorAlert message={resetPasswordError.message || "Password reset failed"} />}
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
                        <div className="title">Email</div>
                        <div className="input">
                            <input
                                name="email"
                                type="text"
                                placeholder="Email address"
                                spellCheck={false}
                                value={formData.email}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className={`error-email ${highlights.email}`}>
                        Enter a valid email address
                    </div>
                    <div className="password-input">
                        <div className="title">New password</div>
                        <div className="input">
                            <input
                                name="newPassword"
                                type="password"
                                placeholder="New password"
                                spellCheck={false}
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className={`error-password ${highlights.newPassword}`}>
                        Please enter a stronger password (8 - 20 characters)
                    </div>
                    <div className="otp-input">
                        <div className="title">OTP</div>
                        <div className="input-send">
                            <div className="input">
                                <input
                                    name="code"
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    spellCheck={false}
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onKeyDown={handleKeyPress}
                                />
                            </div>
                            <div className={`send ${isCodeSent ? "lock" : ""}`} onClick={handleSendCode}>
                                {otpPasswordLoading ? <CircleSpinner size={15} /> : isCodeSent ? `Resend ${counter}s` : "Send code"}
                            </div>
                        </div>
                    </div>
                    <div className={`error-code ${highlights.code}`}>
                        Enter 6-digit code
                    </div>
                </div>
                <div className="footer-container">
                    <Button
                        title={resetPasswordLoading ? <CircleSpinner size={15} /> : "Reset Password"}
                        color={Theme.highlight}
                        styles={`medium ${isFormValid ? "" : "lock"}`}
                        onclick={handleResetPassword}
                    />
                    <div className="sign-up" onClick={handleSignUp}>
                        Don't have an account? Sign up
                    </div>
                </div>
            </div>
        </ResetPasswordContainer>
    );
};

export default ResetPassword;