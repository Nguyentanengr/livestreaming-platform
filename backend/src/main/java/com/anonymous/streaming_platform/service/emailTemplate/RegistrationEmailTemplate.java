package com.anonymous.streaming_platform.service.emailTemplate;

import com.anonymous.streaming_platform.exception.InternalServerException;
import com.anonymous.streaming_platform.exception.error.Error;
import lombok.Getter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Getter
@Component
@Scope("prototype") // Khởi tạo riêng cho mỗi request
public class RegistrationEmailTemplate extends EmailTemplate {

    @Override
    public void buildBody(Object... args) { // token
        try {
            this.body = """
                    <html>
                      <body style="font-family: Arial, sans-serif; text-align: center;">
                        <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                          <img src="https://freelogopng.com/images/all_img/1656151360twitch-logo-png.png" alt="Twitch Logo" width="150">
                          <hr style="border: none; border-top: 1px solid #ddd;">
                          <p>Hey new friend!,</p>
                          <p>Here is your One-Time Password (OTP) for account verification:</p>
                          <p style="font-size: 24px; font-weight: bold; background-color: #f3f3f3; display: inline-block; padding: 10px 20px; border-radius: 5px;">
                            <span style="color: #9146FF;">%s</span>
                          </p>
                          <p>This OTP is valid for the next 1 minute. Do not share this code with anyone.</p>
                          <hr style="border: none; border-top: 1px solid #ddd;">
                          <p style="font-size: 12px; color: gray;">© 2025 Twitch, All Rights Reserved</p>
                          <p style="font-size: 12px; color: gray;">350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA</p>
                        </div>
                      </body>
                    </html>
                    """.formatted(args[0]);
        } catch (Exception e) {
            throw new InternalServerException(Error.MESSAGE_FORMAT_EXCEPTION, "RegistrationEmailTemplate");
        }
    }
}
