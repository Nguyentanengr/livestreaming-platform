package com.nguyentan.livestream_platform.exception;


import com.nguyentan.livestream_platform.dto.response.CodeResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class BusinessException extends RuntimeException {

    private final CodeResponse codeResponse;

    public BusinessException(CodeResponse codeResponse) {
        super(codeResponse.getMessage());
        this.codeResponse = codeResponse;
    }
}
