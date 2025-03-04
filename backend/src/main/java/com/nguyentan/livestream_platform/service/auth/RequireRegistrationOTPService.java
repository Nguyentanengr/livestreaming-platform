package com.nguyentan.livestream_platform.service.auth;

import com.nguyentan.livestream_platform.dto.request.RequireOTPRequest;
import com.nguyentan.livestream_platform.dto.response.CodeResponse;
import com.nguyentan.livestream_platform.exception.BusinessException;
import com.nguyentan.livestream_platform.repository.UserRepository;
import com.nguyentan.livestream_platform.service.email.EmailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RequireRegistrationOTPService {

    private final EmailSender emailSender;
    private final UserRepository userRepository;

    public void requireOTP(RequireOTPRequest request) {

        String email = request.email();

        // Check if email already has an account
        boolean isExistAccount = userRepository.existsByEmail(email);

        if (isExistAccount) throw new BusinessException(CodeResponse.EMAIL_HAS_AN_ACCOUNT);

        emailSender.sendRegistrationOTPTokenEmail(email);
    }
}
