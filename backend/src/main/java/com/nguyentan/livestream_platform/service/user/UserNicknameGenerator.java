package com.nguyentan.livestream_platform.service.user;

import java.util.concurrent.atomic.AtomicInteger;

public class UserNicknameGenerator {

    private static final AtomicInteger counter = new AtomicInteger(1_000_000);

    public static synchronized String getUniqueUserNickname() {
        long timestamp = System.currentTimeMillis() % 1_000_000;
        long uniqueNumber = counter.getAndIncrement();
        return "user" + timestamp + uniqueNumber;
    }
}
