package com.anonymous.streaming_platform.exception;

/*
    - Exception này xảy ra khi lỗi phát sinh xung đột dữ liệu (Ảnh hưởng đến CSDL nếu thực hiện)
    - Chẳng hạn, username đã tồn tại, không thể tạo tài khoản,
    - Khóa học này đã tồn tại, không thể tạo thêm.
 */

import com.anonymous.streaming_platform.exception.error.Error;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConflictDataException extends RuntimeException {

    private final String codeError;
    private final String messageError;

    public ConflictDataException(Error error, Object... args) {
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
