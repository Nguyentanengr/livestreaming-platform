package com.nguyentan.livestream_platform.service.email;

import com.nguyentan.livestream_platform.service.email.template.MailTemplate;

public interface MailService {

    void sendMail(MailTemplate template);

}
