package com.nguyentan.livestream_platform.service.auth;

import com.nguyentan.livestream_platform.dto.request.RequireOTPRequest;
import com.nguyentan.livestream_platform.dto.response.CodeResponse;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.exception.BusinessException;
import com.nguyentan.livestream_platform.repository.UserRepository;
import com.nguyentan.livestream_platform.service.email.EmailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RequireResetPasswordOTPService {

    private final EmailSender emailSender;
    private final UserRepository userRepository;

    public void requireOTP(RequireOTPRequest request) {

        String email = request.email();

        // Check if email already has an account
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BusinessException(CodeResponse.EMAIl_NOT_HAVE_ACCOUNT));

        // Call OTPTokenManager to check & generate OTP and send mail by MailService
        emailSender.sendResetPasswordOTPTokenEmail(email, user.getNickname());
    }
}
