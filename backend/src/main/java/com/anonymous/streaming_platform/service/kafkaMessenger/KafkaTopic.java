package com.anonymous.streaming_platform.service.kafkaMessenger;

public class KafkaTopic {

    public static final String USER_PROFILE_EDIT_TOPIC = "user-profile-edit";
    public static final String USER_PROFILE_EDIT_DLQ_TOPIC = "user-profile-edit-dlq";
    public static final String USER_DELETE_TOPIC = "user-delete";
    public static final String USER_DELETE_DLQ_TOPIC = "user-delete-dlq";
    public static final String NOTIFICATION_TOPIC = "notification";


    private KafkaTopic() {}
}
