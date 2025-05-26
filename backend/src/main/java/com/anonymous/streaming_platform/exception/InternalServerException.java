package com.anonymous.streaming_platform.exception;

/*
    - Exception này xảy ra khi lỗi không xác định trong hệ thống.
    - Chẳng hạn, các dịch vụ thứ 3 bị lỗi, lỗi thư viện bị venerable, lỗi lập trình
 */

import com.anonymous.streaming_platform.exception.error.Error;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InternalServerException extends RuntimeException {

    private final String codeError;
    private final String messageError;

    public InternalServerException(Error error, Object... args) {
        try {
            this.codeError = error.getCode();
            this.messageError = String.format(error.getMessage(), args);
        } catch (Exception e) {
            // Trường hợp throw cao nhất để thông báo lỗi chung (lỗi do format string)
            throw new RuntimeException(Error.MESSAGE_FORMAT_EXCEPTION.getMessage());
        }
    }
}
