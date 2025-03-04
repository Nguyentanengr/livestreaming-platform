package com.nguyentan.livestream_platform.exception;

import com.nguyentan.livestream_platform.dto.response.CodeResponse;
import com.nguyentan.livestream_platform.dto.response.DataResponse;
import com.nguyentan.livestream_platform.dto.response.UserAuthenticationResponse;
import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(value = BusinessException.class)
    public ResponseEntity<?> handlingBusinessException(BusinessException exception) {

        CodeResponse codeResponse = exception.getCodeResponse();

        DataResponse<?> dataResponse = DataResponse.builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .build();

        return new ResponseEntity<>(
                dataResponse,
                codeResponse.getStatus()
        );
    }

}
