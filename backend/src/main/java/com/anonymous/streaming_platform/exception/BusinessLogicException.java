package com.anonymous.streaming_platform.exception;

import com.anonymous.streaming_platform.exception.error.Error;
import lombok.Getter;
import lombok.Setter;
import org.apache.http.util.Args;

/*
    - Exception này xảy ra khi lỗi phát sinh trong quá trình kiểm tra logic nghiệp vụ
    - Chẳng hạn, thông tin về số lượng vé không đủ để đặt vé mới, ...
 */
@Getter
@Setter
public class BusinessLogicException extends RuntimeException {

    private final String codeError;
    private final String messageError;

    public BusinessLogicException(Error error, Object... args) {
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
