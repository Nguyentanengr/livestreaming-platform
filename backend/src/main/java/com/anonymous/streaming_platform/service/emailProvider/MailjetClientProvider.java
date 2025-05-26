package com.anonymous.streaming_platform.service.emailProvider;

import com.anonymous.streaming_platform.exception.InternalServerException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.service.emailTemplate.EmailTemplate;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.transactional.SendContact;
import com.mailjet.client.transactional.SendEmailsRequest;
import com.mailjet.client.transactional.TransactionalEmail;
import com.mailjet.client.transactional.response.SendEmailsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


/*
    - Cung cấp phương thức gửi mail với nhà cung cấp Mailjet
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class MailjetClientProvider implements MailProvider {

    private final MailjetClient mailjetClient;

    @Override
    public void send(EmailTemplate template) {
        try {
            TransactionalEmail email = TransactionalEmail.builder()
                    .from(new SendContact(template.getSender(), template.getSenderName()))
                    .to(new SendContact(template.getRecipient()))
                    .subject(template.getSubject())
                    .htmlPart(template.getBody())
                    .build();

            SendEmailsRequest request = SendEmailsRequest.builder()
                    .message(email)
                    .build();

            SendEmailsResponse response = request.sendWith(mailjetClient);

            log.info("Email with subject {} was sent successfully.", template.getSubject());
        } catch (MailjetException e) {
            log.error("An error occurred while sending email with Mailjet: {}", e.getMessage(), e);
            throw new InternalServerException(Error.EMAIl_CANNOT_SEND, template.getSubject());
        }
    }
}
