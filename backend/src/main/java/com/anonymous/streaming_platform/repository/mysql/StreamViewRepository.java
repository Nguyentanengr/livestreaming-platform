package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.StreamBan;
import com.anonymous.streaming_platform.entity.mysql.StreamView;
import com.anonymous.streaming_platform.entity.mysql.StreamViewId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreamViewRepository extends JpaRepository<StreamView, StreamViewId> {
}
