package com.nguyentan.livestream_platform.service.email;

import com.mailjet.client.MailjetClient;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.transactional.SendContact;
import com.mailjet.client.transactional.SendEmailsRequest;
import com.mailjet.client.transactional.TransactionalEmail;
import com.mailjet.client.transactional.response.SendEmailsResponse;
import com.nguyentan.livestream_platform.dto.response.CodeResponse;
import com.nguyentan.livestream_platform.exception.BusinessException;
import com.nguyentan.livestream_platform.service.email.template.MailTemplate;
import com.nguyentan.livestream_platform.service.email.template.MailTemplateConstant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailjetMailService implements MailService {

    private final MailjetClient mailjetClient;

    @Override
    public void sendMail(MailTemplate template) {
        try {
            TransactionalEmail email = TransactionalEmail.builder()
                    .from(new SendContact(template.getSender(), MailTemplateConstant.MAIL_SENDER_NAME))
                    .to(new SendContact(template.getRecipient()))
                    .subject(template.getSubject())
                    .htmlPart(template.buildBody())
                    .build();

            SendEmailsRequest request = SendEmailsRequest.builder()
                    .message(email)
                    .build();

            SendEmailsResponse response = request.sendWith(mailjetClient);
        } catch (MailjetException e) {
            log.error("An error occurred while sending email with Mailjet: {}", e.getMessage());
            throw new BusinessException(CodeResponse.EMAIl_CANNOT_SEND);
        }
    }
}
