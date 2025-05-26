package com.anonymous.streaming_platform.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Objects;

public class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {

    private static final String PASSWORD_PATTERN =
            "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

    @Override
    public void initialize(StrongPassword constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
        if (Objects.isNull(password)) {
            return true; // throw to NotNull constraint
        }
        return password.matches(PASSWORD_PATTERN);
    }
}
