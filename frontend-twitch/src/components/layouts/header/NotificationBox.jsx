import { Icons } from "../../../assets/icons/Icon";
import { NotificationBoxContainer } from "./NotificationBox.styled";
import ActionButton from "../../commons/ActionButton";
import { Theme } from "../../../assets/styles/Theme";
import Thumbnail from "../../commons/Thumbnail";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NotificationBox = ({refer}) => {

    const thumbnails = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGo79Qi1JkzHiNItTHIcWCpvOehW9SbozRRA&s",
    ];

    const [notifications, setNotifications] = useState(
        [
            { id: 1, thumbnail: thumbnails[0], description: "Ripcode112 has subscribed to your channel", time: "21/12/2024 12:00:00" },
            { id: 2, thumbnail: thumbnails[0], description: "Ripcode112 has like to your video", time: "21/12/2024 12:05:00" },
            { id: 3, thumbnail: thumbnails[0], description: "Ripcode112 has comment to your video has comment to your video has comment to your video", time: "21/12/2024 12:06:00" },
        ]
    );

    const navigate = useNavigate();

    const handleDelete = (id) => {
        setNotifications(notifications.filter(item => item.id !== id));
    }

    return (
        <NotificationBoxContainer ref={refer}>
            <div className="header">
                <div className="gap-container"></div>
                <div className="title">Notifications</div>
                <div className="action-container">
                    <ActionButton icon={<Icons.Setting />} onclick={() => { }} tooltip="Settings" />
                </div>
            </div>
            <hr />
            <div className="notification-container">
                {notifications.map((item) => {
                    return (
                        <div className="notification-item" key={item.id} onClick={() => {navigate(`/channel/${item.id}`)}}>
                            <Thumbnail src={item.thumbnail} onclick={() => {}}/>
                            <div className="description-container">
                                <div className="description">{item.description}</div>
                                <div className="time">{item.time}</div>
                            </div>
                            <div className="delete-button" onClick={() => {handleDelete(item.id)}}>
                                <Icons.CloseSmall />
                            </div>
                        </div>
                    )
                })}
            </div>
        </NotificationBoxContainer>
    )
}

export default NotificationBox;
