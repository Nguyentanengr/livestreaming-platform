package com.anonymous.streaming_platform.service.emailTemplate;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class EmailTemplateFactory {

    public enum EmailType {
        REGISTRATION, RESET_PASSWORD
    }

    public EmailTemplate getTemplate(EmailType emailType) {
        return switch (emailType) {
            case REGISTRATION -> new RegistrationEmailTemplate();
            case RESET_PASSWORD -> new ResetPasswordEmailTemplate();
        };
    }

}
