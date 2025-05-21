import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Theme } from '../../../assets/styles/Theme';
import EditLabel from '../../commons/EditLabel';
import { Icons } from '../../../assets/icons/Icon';
import EditInput from '../../commons/EditInput';
import Button from '../../commons/Button';
import { changePassword } from '../../../service/api/profileApi';
import CircleSpinner from '../../commons/CircleSpinner';
import ErrorAlert from '../../commons/ErrorAlert';

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 450px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;

    .title-header {
        font-size: 18px;
        font-weight: 700;
    }

    .subtitle {
        font-size: 14px;        
        color: ${Theme.lightDark}
    }

    h2 {
        margin: 0 0 20px;
        font-size: 20px;
        font-weight: 700;
    }

    .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        font-size: 24px;
    }

    .section {
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .a-title {
            margin: 20px 0;
            font-weight: 500;

            &.red {
                color: ${Theme.lightRed};
                margin: 0 0;
            }
        }

        .title {
            margin-bottom: 7px;
            font-size: 14px;
            font-weight: 500;
        }

        input, textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }

        textarea {
            height: 100px;
            resize: none;
        }

        .upload-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px 0;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 5px;
            cursor: pointer;
        }

        .note {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }

        .error {
            color: red;
            font-size: 12px;
            margin-top: 5px;
        }
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 10px;

        button {
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
        }

        .cancel {
            background: none;
            border: 1px solid #ddd;
        }

        .save {
            background: ${Theme.highlight};
            color: white;
            border: none;
        }

        .update {
            background: ${Theme.highlight};
            color: white;
            border: none;
            font-size: 14px;
        }

        .delete {
            background: #ef4444;
            color: white;
            border: none;
        }
    }

    .line {
        margin: 20px 0;
        border-bottom: 1px solid rgba(0,0,0, 0.1)
    }

    .a-buttons {
        display: flex;
        justify-content: start;
        gap: 10px;
        margin-top: 30px;

        button {
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
        }

        .delete {
            background: #ef4444;
            color: white;
            border: none;
            font-size: 14px;
        }
    }
`;

const AccountSettingModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const { changePasswordLoading, changePasswordError } = useSelector((state) => state.profile);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [errors, setErrors] = useState({});

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,255}$/;
        return regex.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });

        // Client-side validation
        if (name === "oldPassword") {
            if (!value) {
                setErrors({ ...errors, oldPassword: "Current password is required" });
            } else if (!validatePassword(value)) {
                setErrors({ ...errors, oldPassword: "Password must be 8-255 characters, include uppercase, lowercase, number, and special character" });
            } else {
                setErrors({ ...errors, oldPassword: "" });
            }
        }
        if (name === "newPassword") {
            if (!value) {
                setErrors({ ...errors, newPassword: "New password is required" });
            } else if (!validatePassword(value)) {
                setErrors({ ...errors, newPassword: "Password must be 8-255 characters, include uppercase, lowercase, number, and special character" });
            } else {
                setErrors({ ...errors, newPassword: "" });
            }
        }
        if (name === "confirmNewPassword") {
            if (!value) {
                setErrors({ ...errors, confirmNewPassword: "Confirm password is required" });
            } else if (value !== passwordData.newPassword) {
                setErrors({ ...errors, confirmNewPassword: "Passwords do not match" });
            } else {
                setErrors({ ...errors, confirmNewPassword: "" });
            }
        }
    };

    const handleSubmit = () => {
        const newErrors = {};
        if (!passwordData.oldPassword) {
            newErrors.oldPassword = "Current password is required";
        } else if (!validatePassword(passwordData.oldPassword)) {
            newErrors.oldPassword = "Password must be 8-255 characters, include uppercase, lowercase, number, and special character";
        }
        if (!passwordData.newPassword) {
            newErrors.newPassword = "New password is required";
        } else if (!validatePassword(passwordData.newPassword)) {
            newErrors.newPassword = "Password must be 8-255 characters, include uppercase, lowercase, number, and special character";
        }
        if (!passwordData.confirmNewPassword) {
            newErrors.confirmNewPassword = "Confirm password is required";
        } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            newErrors.confirmNewPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch(changePassword(passwordData)).unwrap()
                .then(() => {
                    onClose();
                })
                .catch((error) => {
                    setErrors({ ...errors, general: error.message || "Failed to update password" });
                });
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            alert("Account deleted!");
            onClose();
        }
    };

    return (
        <Modal>
            <ModalContent>
                <div className="title-header">
                    Account Settings
                </div>
                <div className="subtitle">
                    Manage your account security settings
                </div>
                <span className="close-btn" onClick={onClose}><Icons.Close /></span>
                <div className="section">
                    <div className="a-title">
                        Change Password
                    </div>
                    {errors.general && <div className="error">{errors.general}</div>}
                    <div className="section">
                        <EditLabel title={"Current Password"} />
                        <EditInput
                            ph={'Enter your current password'}
                            value={passwordData.oldPassword}
                            name={'oldPassword'}
                            type='password'
                            onchange={handleChange}
                        />
                        {errors.oldPassword && <div className="error">{errors.oldPassword}</div>}
                    </div>
                    <div className="section">
                        <EditLabel title={"New Password"} />
                        <EditInput
                            ph={'Enter your new password'}
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onchange={handleChange}
                        />
                        {errors.newPassword && <div className="error">{errors.newPassword}</div>}
                    </div>
                    <div className="section">
                        <EditLabel title={"Confirm New Password"} />
                        <EditInput
                            ph={'Confirm your new password'}
                            type="password"
                            name="confirmNewPassword"
                            value={passwordData.confirmNewPassword}
                            onchange={handleChange}
                        />
                        {errors.confirmNewPassword && <div className="error">{errors.confirmNewPassword}</div>}
                    </div>
                    <div className="buttons">
                        <button className="update" onClick={handleSubmit}>
                            {changePasswordLoading ? <CircleSpinner size={15} /> : "Update Password"}
                        </button>
                    </div>
                </div>
                <div className="section">
                    <div className="line"></div>
                    <div className="a-title red">
                        Delete Account
                    </div>
                    <div className="note">Once you delete your account, there is no going back. Please be certain.</div>
                    <div className="a-buttons">
                        <button className="delete" onClick={handleDelete}>Delete Account</button>
                    </div>
                </div>
            </ModalContent>
            {changePasswordError && <ErrorAlert message={changePasswordError.message} type='error'/>}
        </Modal>
    );
};

export default AccountSettingModal;