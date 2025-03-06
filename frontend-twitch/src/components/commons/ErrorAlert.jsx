


import { ErrorAlertContainer } from "./ErrorAlert.styled";
import { useState, useEffect } from "react";
import { Icons } from "../../assets/icons/Icon";

const ErrorAlert = ({ message, type="error" }) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);


    return (
        <ErrorAlertContainer show={show} type={type}>
            <div className="error-content">
                <div className="error-icon">{type === "error" ? <Icons.ErrorAlert /> : <Icons.UserCheck />}</div>
                <div className="error-message">{message}</div>
                <div className="close-btn" onClick={() => setShow(false)}>
                    <Icons.Time />
                </div>
            </div>
        </ErrorAlertContainer>
    );
};

export default ErrorAlert;