package com.nguyentan.livestream_platform.repository;

import com.nguyentan.livestream_platform.entity.Notification;
import com.nguyentan.livestream_platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

}
