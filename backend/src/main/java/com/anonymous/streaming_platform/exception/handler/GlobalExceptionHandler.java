package com.anonymous.streaming_platform.exception.handler;


import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ErrorResponse;
import com.anonymous.streaming_platform.exception.*;
import com.anonymous.streaming_platform.exception.error.Error;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(value = AuthenticationException.class)
    public ResponseEntity<ApiResponse<?>> handleAuthenticationException(AuthenticationException e) {

        // Các Error (code, message) đã được bọc toàn bộ trong các Custom Exception
        // Lấy thông tin từ Custom Exception và phản hồi về client
        log.warn("Authentication error occurred: {}", e.getMessageError());

        ApiResponse<Void> response = ApiResponse.getErrorResponse(ErrorResponse.builder()
                .code(e.getCodeError())
                .message(e.getMessageError())
                .build());

        return new ResponseEntity<>(
                response,
                HttpStatus.UNAUTHORIZED
        );
    }


    @ExceptionHandler(value = EntityNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleEntityNotFoundException(EntityNotFoundException e) {

        // Các Error (code, message) đã được bọc toàn bộ trong các Custom Exception
        // Lấy thông tin từ Custom Exception và phản hồi về client

        log.warn("Entity not found error occurred: {}", e.getMessageError());

        ApiResponse<Void> response = ApiResponse.getErrorResponse(ErrorResponse.builder()
                .code(e.getCodeError())
                .message(e.getMessageError())
                .build());

        return new ResponseEntity<>(
                response,
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(value = BusinessLogicException.class)
    public ResponseEntity<ApiResponse<?>> handleBusinessLogicException(BusinessLogicException e) {

        // Các Error (code, message) đã được bọc toàn bộ trong các Custom Exception
        // Lấy thông tin từ Custom Exception và phản hồi về client
        log.warn("Business logic error occurred: {}", e.getMessageError());

        ApiResponse<Void> response = ApiResponse.getErrorResponse(ErrorResponse.builder()
                .code(e.getCodeError())
                .message(e.getMessageError())
                .build());

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(value = ConflictDataException.class)
    public ResponseEntity<ApiResponse<?>> handleConflictDataException(ConflictDataException e) {

        // Các Error (code, message) đã được bọc toàn bộ trong các Custom Exception
        // Lấy thông tin từ Custom Exception và phản hồi về client
        log.warn("Conflict data occurred: {}", e.getMessageError());

        ApiResponse<Void> response = ApiResponse.getErrorResponse(ErrorResponse.builder()
                .code(e.getCodeError())
                .message(e.getMessageError())
                .build());

        return new ResponseEntity<>(
                response,
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handlingMethodArgumentNotValidException
            (MethodArgumentNotValidException e) {

        // Lấy Error dựa trên mã lỗi định nghĩa trên từng field DTO
        Error error = Error.valueOf(e.getFieldError().getDefaultMessage());

        log.warn("Validation failed on field '{}', rejected value '{}'"
                , e.getFieldError().getDefaultMessage(), e.getFieldError().getRejectedValue());

        ApiResponse<Void> response = ApiResponse.getErrorResponse(ErrorResponse.get(error));
        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }


    @ExceptionHandler(value = InternalServerException.class)
    public ResponseEntity<ApiResponse<?>> handleInternalServerException(InternalServerException e) {

        // Các Error (code, message) đã được bọc toàn bộ trong các Custom Exception
        // Lấy thông tin từ Custom Exception và phản hồi về client
        log.warn("Internal server error occurred: {}", e.getMessageError());

        ApiResponse<Void> response = ApiResponse.getErrorResponse(ErrorResponse.builder()
                .code(e.getCodeError())
                .message(e.getMessageError())
                .build());


        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ApiResponse<?>> handleUncategorizedException(Exception e) {

        // Đối với các Exception hệ thống, Error chưa được bọc, nên tự tạo thủ công
        // và phản hồi về client
        Error error = Error.UNCATEGORIZED_ERROR;
        log.error("Uncategorized error occurred: {}", e.getMessage(), e);

        ApiResponse<Void> response = ApiResponse.getErrorResponse(ErrorResponse.get(error));

        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

}
