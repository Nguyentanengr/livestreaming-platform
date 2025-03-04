package com.nguyentan.livestream_platform.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;


@Getter
@AllArgsConstructor
public enum CodeResponse {

    USER_CREATED(1000, HttpStatus.OK, ""),
    REGISTER_SUCCESSFULLY(1000, HttpStatus.OK, "Register account successfully"),
    EMAIL_HAS_BEEN_SEND(1000, HttpStatus.OK, "Email has been sent"),
    LOGIN_SUCCESSFULLY(1000, HttpStatus.OK, "Login successfully"),
    REFRESH_TOKEN_SUCCESSFULLY(1000, HttpStatus.OK, "Refresh token successfully"),
    LOGOUT_SUCCESSFULLY(1000, HttpStatus.OK, "Logout successfully"),
    RESET_PASSWORD_SUCCESSFULLY(1000, HttpStatus.OK, "Reset password successfully"),

    INVALID_REFRESH_TOKEN(9019, HttpStatus.BAD_REQUEST, "Refresh token is invalid or expired"),
    LOGIN_FAIL(9017, HttpStatus.UNAUTHORIZED, "Login failed"),
    ACCOUNT_HAS_BEEN_LOCKED(9015, HttpStatus.BAD_REQUEST, "Account has been locked"),
    JWT_TOKEN_CANNOT_GENERATE(9013, HttpStatus.BAD_REQUEST, "An error occurred while serialize jwt object"),
    ROLE_NOT_FOUND(9011, HttpStatus.NOT_FOUND, "Could not find role by name: USER"),
    OTP_INCORRECT_OR_EXPIRED(9009, HttpStatus.BAD_REQUEST, "OTP is incorrect or expired"),
    EMAIl_NOT_HAVE_ACCOUNT(9007, HttpStatus.BAD_REQUEST, "This email does not have an account"),
    EMAIl_CANNOT_SEND(9005, HttpStatus.BAD_REQUEST, "An error occurred while sending the email"),
    OTP_CANNOT_GENERATE(9003, HttpStatus.BAD_REQUEST, "Cannot generate OTP for email in this time"),
    EMAIL_HAS_AN_ACCOUNT(9001, HttpStatus.CONFLICT, "Email already has an account");


    private final long code;
    private final HttpStatusCode status;
    private final String message;

}
