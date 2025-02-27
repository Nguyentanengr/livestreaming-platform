package com.nguyentan.livestream_platform.validator;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StrongPasswordValidator.class)
public @interface StrongPassword {

    String message() default "Password must be stronger. Try using a mix of uppercase," +
            " lowercase, numbers, and symbols.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
