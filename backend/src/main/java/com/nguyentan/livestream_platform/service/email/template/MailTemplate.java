package com.nguyentan.livestream_platform.service.email.template;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public abstract class MailTemplate {

    protected String sender;
    protected String recipient;
    protected String subject;

    public MailTemplate(String sender, String subject) {
        this.sender = sender;
        this.subject = subject;
    }

    public abstract String buildBody();
}
