import { Icons } from "../../../assets/icons/Icon";
import { NotificationBoxContainer } from "./NotificationBox.styled";
import ActionButton from "../../commons/ActionButton";
import { Theme } from "../../../assets/styles/Theme";
import Thumbnail from "../../commons/Thumbnail";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification, fetchNotifications, markAllNotificationsAsRead } from "../../../service/api/notiApi";
import { convertTimeToTimeAgo } from "../../../utils/convert";
import { deleteNoti, resetNotifications } from "../../../stores/slices/notiSlice";
import { current } from "@reduxjs/toolkit";

const NotificationBox = ({refer}) => {

    const dispatch = useDispatch();

    const thumbnails = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGo79Qi1JkzHiNItTHIcWCpvOehW9SbozRRA&s",
    ];

    const { currentPage, loading, notifications } = useSelector((state) => state.notifications);

    const navigate = useNavigate();

    const handleDelete = (id) => {
        console.log("delete", id);
        dispatch(deleteNotification({ notificationId: id })).unwrap()
        .then(() => {
            dispatch(deleteNoti(id));
        })
    }

    const handleContent = (content) => {
        return content ? content : "This is a default notification content";
    };

    useEffect(() => {
        dispatch(fetchNotifications({ page: currentPage, size: 20 })).unwrap()
        .then((res) => {
            console.log("responses", res);
        });

        return () => {
            dispatch(resetNotifications());
            dispatch(markAllNotificationsAsRead());
        }
    }, [])

    return (
        <NotificationBoxContainer ref={refer}>
            <div className="header">
                <div className="gap-container"></div>
                <div className="title">Notifications</div>
                <div className="action-container">
                    <ActionButton icon={<Icons.CheckDouble />} onclick={() => {dispatch(markAllNotificationsAsRead())}}/>
                </div>
            </div>
            <hr />
            <div className="notification-container">
                {notifications.map((item) => {
                    console.log("item", item.id);
                    return (
                        <div className={`notification-item ${item.isRead ? 'isRead' : ''}`} key={item.id}>
                            <Thumbnail src={item.user.avatar} onclick={() => {}}/>
                            <div className="description-container">
                                <div className="description">{handleContent(item.content)}</div>
                                <div className="time">{convertTimeToTimeAgo(item.createdAt)}</div>
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