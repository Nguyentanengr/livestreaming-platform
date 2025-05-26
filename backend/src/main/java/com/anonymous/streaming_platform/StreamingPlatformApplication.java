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
		Dotenv dotenv = Dotenv.configure().load();
		// Đưa các biến từ .env vào môi trường hệ thống
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		// Lấy ApplicationContext
		ApplicationContext context = SpringApplication.run(StreamingPlatformApplication.class, args);


	}

}
