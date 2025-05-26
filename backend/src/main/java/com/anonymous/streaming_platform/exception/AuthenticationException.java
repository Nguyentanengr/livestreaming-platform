package com.anonymous.streaming_platform.exception;

/*
    - Exception này xảy ra khi lỗi xác thực
    - Chẳng hạn, không thể đăng nhập
 */

import com.anonymous.streaming_platform.exception.error.Error;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationException extends RuntimeException {

    private final String codeError;
    private final String messageError;

    public AuthenticationException(Error error, Object... args) {
        // args là tham số để custom message trong Error
        // Bọc Error trong custom Exception
        try {
            this.codeError = error.getCode();
            this.messageError = String.format(error.getMessage(), args);
        } catch (Exception e) {
            // Trả về lỗi hệ thống khi lập trình sai (không đúng format)
            throw new InternalServerException(Error.MESSAGE_FORMAT_EXCEPTION, error.getMessage());
        }
    }
}
