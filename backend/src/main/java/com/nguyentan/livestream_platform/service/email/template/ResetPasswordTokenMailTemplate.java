package com.nguyentan.livestream_platform.service.email.template;


import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class ResetPasswordTokenMailTemplate extends MailTemplate {

    protected String token;
    protected String username;

    public ResetPasswordTokenMailTemplate() {
        super(MailTemplateConstant.MAIL_SENDER, MailTemplateConstant.MAIL_TEMPLATE_TOKEN_SUBJECT);
    }


    @Override
    public String buildBody() {
        return MailTemplateConstant.MAIL_TEMPLATE_TOKEN_HTML
                .replace("${this.token}", this.token);
    }
}
