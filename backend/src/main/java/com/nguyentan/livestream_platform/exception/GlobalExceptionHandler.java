package com.nguyentan.livestream_platform.exception;

import com.nguyentan.livestream_platform.dto.response.CodeResponse;
import com.nguyentan.livestream_platform.dto.response.DataResponse;
import com.nguyentan.livestream_platform.dto.response.UserAuthenticationResponse;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@Slf4j
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


    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<?> handlingMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        ex.getMessage();

        log.error(ex.getFieldError().getDefaultMessage());
        CodeResponse codeResponse = CodeResponse.valueOf(ex.getFieldError().getDefaultMessage());

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
