package com.anonymous.streaming_platform.service.emailProvider;

import com.anonymous.streaming_platform.service.emailTemplate.EmailTemplate;

/*
    - Xác định gửi email qua các nhà cung cấp khác nhau (các triển khai).
 */
public interface MailProvider {
    void send(EmailTemplate template);
}
