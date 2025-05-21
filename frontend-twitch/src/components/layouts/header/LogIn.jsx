import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import Button from "../../commons/Button";
import EditInput from "../../commons/EditInput";
import ErrorAlert from "../../commons/ErrorAlert";
import CircleSpinner from "../../commons/CircleSpinner";
import { resetLoginState } from "../../../stores/slices/authSlice";
import { loginUser } from "../../../service/api/authApi";
import { LogInContainer } from "./LogIn.styled";
import { REGEXS } from "../../../utils/regex";

const LogIn = ({ onclose, onSignUp, onResetPass }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loginLoading, loginError, accessToken } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = REGEXS.EMAIL_REGEX.test(formData.email.trim()) && formData.password.trim() !== "";
    setIsFormValid(isValid);
  }, [formData]);

  useEffect(() => {
    if (user) {

      const intendedRoute = localStorage.getItem('intendedRoute');
      localStorage.removeItem('intendedRoute'); // Clear after use
      if (intendedRoute) {
        navigate(intendedRoute);
      } else {
        window.location.reload();
      }
    }
    return () => dispatch(resetLoginState());
  }, [user, dispatch, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = () => {
    if (isFormValid) {
      dispatch(loginUser(formData));
    }
  };

  const handleKeyPress = (e, nextField) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      if (nextField === "submit") {
        handleSubmit();
      } else {
        document.querySelector(`input[name="${nextField}"]`)?.focus();
      }
    }
  };

  const handleSignUp = () => {
    onclose();
    onSignUp();
  };

  const handleTrouble = () => {
    onclose();
    onResetPass();
  };

  return (
    <LogInContainer>
      {loginError && <ErrorAlert message={loginError.message || "Login failed"} />}
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
            <div className="title">Email</div>
            <div className="input">
              <EditInput
                name="email"
                value={formData.email}
                onchange={handleInputChange}
                onenter={(e) => handleKeyPress(e, "password")}
              />
            </div>
          </div>
          <div className="password-input">
            <div className="title">Password</div>
            <div className="input">
              <EditInput
                name="password"
                type="password"
                value={formData.password}
                onchange={handleInputChange}
                onenter={(e) => handleKeyPress(e, "submit")}
              />
            </div>
          </div>
          <div className="trouble" onClick={handleTrouble}>
            Trouble logging in?
          </div>
        </div>
        <div className="footer-container">
          <Button
            title={loginLoading ? <CircleSpinner size={15} /> : "Log In"}
            color={Theme.highlight}
            styles={`medium ${!isFormValid ? "lock" : ""}`}
            onclick={handleSubmit}
          />
          <div className="sign-up" onClick={handleSignUp}>
            Don't have an account? Sign up
          </div>
        </div>
      </div>
    </LogInContainer>
  );
};

export default LogIn;