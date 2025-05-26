package com.anonymous.streaming_platform.mapper;


import com.anonymous.streaming_platform.dto.response.NotificationResponse;
import com.anonymous.streaming_platform.entity.mongodb.Notification;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    NotificationResponse mapToNotificationResponse(Notification notification);

}
