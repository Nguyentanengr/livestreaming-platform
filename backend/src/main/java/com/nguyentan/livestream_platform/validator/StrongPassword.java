package com.nguyentan.livestream_platform.validator;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StrongPasswordValidator.class)
public @interface StrongPassword {

    String message() default "PASSWORD_NO_STRONG";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
