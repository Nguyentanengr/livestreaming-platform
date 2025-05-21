import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Theme } from "../../../assets/styles/Theme";
import { updateMyProfile } from "../../../service/api/profileApi";
import ErrorAlert from "../../commons/ErrorAlert";
import CircleSpinner from "../../commons/CircleSpinner";

// Styled components (khôi phục CSS gốc)
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
    width: 500px;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        width: 5px;
        background-color: ${Theme.mediumSoft};
        border-radius: 8px;
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
        margin-bottom: 20px;

        label {
            display: block;
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 5px;
        }

        input, textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }

        textarea {
            height: 100px;
            resize: none;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", 'Helvetica Neue', sans-serif;
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
    .p-section {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        /* justify-content: center; Căn giữa avatar */
        gap: 10px;

        .upload-cnt {
            padding-top: 10px;
        }

        label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 5px;
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

        button {
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
        }

        .cancel {
            background: none;
            border: 1px solid #ddd;
            font-size: 14px;
        }

        .save {
            background: ${Theme.highlight};
            color: white;
            border: none;
            font-size: 14px;
        }

        .update {
            background: ${Theme.highlight};
            color: white;
            border: none;
        }

        .delete {
            background: #ef4444;
            color: white;
            border: none;
        }
    }
`;

const Thumbnail = ({ src, size }) => {
    const ThumbnailStyled = styled.div`
        width: ${size === "vlarge" ? "80px" : "40px"};
        height: ${size === "vlarge" ? "80px" : "40px"};
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `;

    return (
        <ThumbnailStyled>
            <img src={src} alt="thumbnail" />
        </ThumbnailStyled>
    );
};

const EditProfileModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const { myProfile, updateProfileLoading, updateProfileError } = useSelector((state) => state.profile);

    // Initialize formData with default values
    const [formData, setFormData] = useState({
        avatar: myProfile?.avatar || "https://via.placeholder.com/80",
        avatarFile: null,
        username: myProfile?.username || "",
        bio: myProfile?.bio || "",
        link: {
            youtube: myProfile?.link?.youtube || "",
            tiktok: myProfile?.link?.tiktok || "",
            discord: myProfile?.link?.discord || "",
        },
    });

    // State for errors
    const [errors, setErrors] = useState({
        avatar: "",
        username: "",
        bio: "",
        youtube: "",
        tiktok: "",
        discord: "",
        general: "",
    });

    // Regex for link validation
    const linkValidators = {
        youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
        tiktok: /^(https?:\/\/)?(www\.)?tiktok\.com\/.+$/,
        discord: /^(https?:\/\/)?(www\.)?discord\.com\/.+$/,
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setErrors({ ...errors, avatar: "File size must be less than 2MB" });
                return;
            }
            if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
                setErrors({ ...errors, avatar: "Only JPG, PNG, or GIF files are allowed" });
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, avatar: reader.result, avatarFile: file });
                setErrors({ ...errors, avatar: "" });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle input/textarea changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validation for username
        if (name === "username") {
            if (!value) {
                setErrors({ ...errors, username: "Username cannot be empty" });
            } else if (value.length < 4 || value.length > 20) {
                setErrors({ ...errors, username: "Username must be between 4 and 20 characters" });
            } else {
                setErrors({ ...errors, username: "" });
            }
        }

        // Validation for bio
        if (name === "bio") {
            if (value.length > 2000) {
                setErrors({ ...errors, bio: "Bio cannot exceed 2000 characters" });
            } else {
                setErrors({ ...errors, bio: "" });
            }
        }
    };

    // Handle social link changes
    const handleLinkChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            link: { ...formData.link, [name]: value },
        });

        // Validation for links
        if (value) {
            if (value.length > 255) {
                setErrors({
                    ...errors,
                    [name]: `Link ${name} cannot exceed 255 characters`,
                });
            } else if (!linkValidators[name].test(value)) {
                setErrors({
                    ...errors,
                    [name]: `Invalid ${name} URL. Must start with https://www.${name}.com/ or similar.`,
                });
            } else {
                setErrors({ ...errors, [name]: "" });
            }
        } else {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const onSave = (data) => {
        const formDataToSend = new FormData();
        if (data.avatarFile) {
            formDataToSend.append("avatar", data.avatarFile);
        }
        // Send profile as JSON with explicit Content-Type
        const profileData = {
            username: data.username,
            bio: data.bio,
            link: data.link,
        };
        formDataToSend.append(
            "profile",
            new Blob([JSON.stringify(profileData)], { type: "application/json" })
        );

        dispatch(updateMyProfile(formDataToSend)).unwrap()
            .then((action) => {
                console.log("Profile updated successfully", action);
                localStorage.setItem("user", JSON.stringify({
                    id: action.id,
                    username: action.username,
                    avatar: action.avatar,
                }));
                onClose();
            })
            .catch((error) => {
                setErrors({ ...errors, general: error.message || "Failed to update profile" });
            });
    };

    // Handle form submission
    const handleSubmit = () => {
        let newErrors = { ...errors };

        // Validation for username
        if (!formData.username) {
            newErrors.username = "Username cannot be empty";
        } else if (formData.username.length < 4 || formData.username.length > 20) {
            newErrors.username = "Username must be between 4 and 20 characters";
        }

        // Validation for bio
        if (formData.bio.length > 2000) {
            newErrors.bio = "Bio cannot exceed 2000 characters";
        }

        // Validation for links
        const link = { youtube: "", tiktok: "", discord: "" }; // Ensure link is not null
        ["youtube", "tiktok", "discord"].forEach((platform) => {
            const linkValue = formData.link[platform];
            link[platform] = linkValue;
            if (linkValue) {
                if (linkValue.length > 255) {
                    newErrors[platform] = `Link ${platform} cannot exceed 255 characters`;
                } else if (!linkValidators[platform].test(linkValue)) {
                    newErrors[platform] = `Invalid ${platform} URL. Must start with https://www.${platform}.com/ or similar.`;
                }
            }
        });

        setErrors(newErrors);

        // Check for errors
        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        onSave(formData);
    };

    return (
        <Modal>
            <ModalContent>
                <h2>Edit Profile</h2>
                <span className="close-btn" onClick={onClose}>×</span>
                {errors.general && <div className="error">{errors.general}</div>}
                <div className="p-section">
                    <div className="profile">
                        <label>Profile Picture</label>
                        <Thumbnail src={formData.avatar} size="vlarge" />
                    </div>
                    <div className="upload-cnt">
                        <label className="upload-btn">
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/gif"
                                style={{ display: "none" }}
                                onChange={handleImageUpload}
                            />
                            Upload Image
                        </label>
                        <div className="note">JPG, GIF or PNG. Max size 2MB.</div>
                        {errors.avatar && <div className="error">{errors.avatar}</div>}
                    </div>
                </div>
                <div className="section">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        
                    />
                    <div className="note">
                        This is your public display name. It can only be changed once every 30 days.
                    </div>
                    {errors.username && <div className="error">{errors.username}</div>}
                </div>
                <div className="section">
                    <label>Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                    ></textarea>
                    <div className="note">Brief description for your profile. URLs are hyperlinked.</div>
                    {errors.bio && <div className="error">{errors.bio}</div>}
                </div>
                <div className="section">
                    <label>Social Links</label>
                    <div style={{ marginBottom: "10px" }}>
                        <label>YouTube</label>
                        <input
                            type="text"
                            name="youtube"
                            value={formData.link.youtube}
                            onChange={handleLinkChange}
                            placeholder="https://www.youtube.com/..."
                        />
                        {errors.youtube && <div className="error">{errors.youtube}</div>}
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>TikTok</label>
                        <input
                            type="text"
                            name="tiktok"
                            value={formData.link.tiktok}
                            onChange={handleLinkChange}
                            placeholder="https://www.tiktok.com/..."
                        />
                        {errors.tiktok && <div className="error">{errors.tiktok}</div>}
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Discord</label>
                        <input
                            type="text"
                            name="discord"
                            value={formData.link.discord}
                            onChange={handleLinkChange}
                            placeholder="https://discord.gg/..."
                        />
                        {errors.discord && <div className="error">{errors.discord}</div>}
                    </div>
                </div>
                <div className="buttons">
                    <button className="cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="save" onClick={handleSubmit}>
                        {updateProfileLoading ? <CircleSpinner size={15} /> : "Save Changes"}
                    </button>
                </div>
            </ModalContent>
            {updateProfileError && <ErrorAlert message={updateProfileError.message} type="error" />}
        </Modal>
    );
};

export default EditProfileModal;