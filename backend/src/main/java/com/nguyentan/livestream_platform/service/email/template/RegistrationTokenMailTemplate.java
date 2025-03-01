package com.nguyentan.livestream_platform.service.email.template;


import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class RegistrationTokenMailTemplate extends MailTemplate {

    protected String token;

    public RegistrationTokenMailTemplate() {
        super(MailTemplateConstant.MAIL_SENDER, MailTemplateConstant.MAIL_TEMPLATE_TOKEN_SUBJECT);
    }


    @Override
    public String buildBody() {
        return MailTemplateConstant.MAIL_TEMPLATE_TOKEN_HTML
                .replace("${this.token}", this.token);
    }
}
