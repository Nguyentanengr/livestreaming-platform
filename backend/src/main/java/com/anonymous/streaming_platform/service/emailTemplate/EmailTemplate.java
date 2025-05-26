package com.anonymous.streaming_platform.service.emailTemplate;

import lombok.Getter;
import lombok.Setter;

@Getter
public abstract class EmailTemplate {

    protected String sender;
    protected String senderName;
    protected String recipient;
    protected String subject;
    protected String body;

    public EmailTemplate() {
    }

    public void buildHeader(String sender, String senderName, String recipient, String subject) {
        this.sender = sender;
        this.senderName = senderName;
        this.recipient = recipient;
        this.subject = subject;
    }

    public abstract void buildBody(Object... args); // Cập nhật body

}