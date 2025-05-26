package com.anonymous.streaming_platform.exception;

/*
    - Exception này xảy ra khi dữ liệu từ các thực thể không được tìm thấy
    - Vd: không tìm thấy tên user, ...
 */

import com.anonymous.streaming_platform.exception.error.Error;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EntityNotFoundException extends RuntimeException {

    private final String codeError;
    private final String messageError;

    public EntityNotFoundException(Error error, Object... args) {
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
