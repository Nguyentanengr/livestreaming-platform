package com.anonymous.streaming_platform.service;


import com.anonymous.streaming_platform.service.emailProvider.MailProvider;
import com.anonymous.streaming_platform.service.emailTemplate.EmailConstant;
import com.anonymous.streaming_platform.service.emailTemplate.EmailTemplate;
import com.anonymous.streaming_platform.service.emailTemplate.EmailTemplateFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailSenderService {

    private final MailProvider mailProvider;
    private final EmailTemplateFactory emailTemplateFactory;


    public void sendRegistrationOtpEmail(String email, String otp) {

        // Tạo email
        EmailTemplate template = emailTemplateFactory
                .getTemplate(EmailTemplateFactory.EmailType.REGISTRATION);

        template.buildHeader(EmailConstant.SENDER_ADDRESS, EmailConstant.SENDER_NAME,
                email , EmailConstant.REGISTRATION_SUBJECT);

        template.buildBody(otp);

        log.info("Built registration email with OTP {} for email {}.", otp, email);

        // Gửi email
        mailProvider.send(template);

    }

    public void sendResetPasswordOtpEmail(String email, String username, String otp) {

        // Tạo email
        EmailTemplate template = emailTemplateFactory
                .getTemplate(EmailTemplateFactory.EmailType.RESET_PASSWORD);

        template.buildHeader(EmailConstant.SENDER_ADDRESS, EmailConstant.SENDER_NAME,
                email , EmailConstant.REGISTRATION_SUBJECT);

        template.buildBody(username, otp);

        log.info("Built reset password email with OTP {} for email {}.", otp, email);

        mailProvider.send(template);
    }

}
