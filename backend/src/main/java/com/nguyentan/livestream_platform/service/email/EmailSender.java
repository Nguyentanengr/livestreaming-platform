package com.nguyentan.livestream_platform.service.email;

import com.nguyentan.livestream_platform.service.OTP.OTPTokenManager;
import com.nguyentan.livestream_platform.service.email.template.RegistrationTokenMailTemplate;
import com.nguyentan.livestream_platform.service.email.template.ResetPasswordTokenMailTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


/**
 * "This class is only used for sending different types of emails,
 * selecting a template for the corresponding email based on each function,
 * signing the sender, adding information to it, and sending it."
 *
 * @author Nguyen Tan
 * @version 1.0
 */


@Service
@RequiredArgsConstructor
public class EmailSender {

    private final MailService mailService;
    private final OTPTokenManager tokenManager;
    private final RegistrationTokenMailTemplate registrationTokenTemplate;
    private final ResetPasswordTokenMailTemplate resetPasswordTokenTemplate;

    public void sendRegistrationOTPTokenEmail(String email) {

        // Generate token
        String OTPToken = tokenManager.generateOTPToken(email);

        // Create a mail template
        registrationTokenTemplate.setRecipient(email);
        registrationTokenTemplate.setToken(OTPToken);

        /*
            This method only retrieves the data constructed from the Template
            to complete an email without making any modifications.
         */
        mailService.sendMail(registrationTokenTemplate);
    }

    public void sendResetPasswordOTPTokenEmail(String email) {

        // Generate token
        String OTPToken = tokenManager.generateOTPToken(email);

        // Create a mail template
        resetPasswordTokenTemplate.setRecipient(email);
        resetPasswordTokenTemplate.setToken(OTPToken);
        resetPasswordTokenTemplate.setUsername("Pham Tan Nguyen");

        mailService.sendMail(resetPasswordTokenTemplate);

    }
}
