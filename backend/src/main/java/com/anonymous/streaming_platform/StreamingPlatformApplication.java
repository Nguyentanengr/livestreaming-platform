package com.anonymous.streaming_platform;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

@Slf4j
@EnableScheduling
@SpringBootApplication
public class StreamingPlatformApplication {


	public static void main(String[] args) {

		// Tải tệp .env từ thư mục gốc
		try {
			Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
			dotenv.entries().forEach(entry -> {
				// Chỉ đặt System property nếu chưa có trong môi trường
				if (System.getProperty(entry.getKey()) == null && System.getenv(entry.getKey()) == null) {
					System.setProperty(entry.getKey(), entry.getValue());
					log.info("Set system property from .env: {}={}", entry.getKey(), entry.getValue());
				}
			});
		} catch (Exception e) {
			log.warn("Could not load .env file, using environment variables instead: {}", e.getMessage());
		}
		// Lấy ApplicationContext
		ApplicationContext context = SpringApplication.run(StreamingPlatformApplication.class, args);


	}

}
