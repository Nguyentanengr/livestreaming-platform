package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.Category;
import com.anonymous.streaming_platform.entity.mysql.StreamBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreamBanRepository extends JpaRepository<StreamBan, Long> {
}
