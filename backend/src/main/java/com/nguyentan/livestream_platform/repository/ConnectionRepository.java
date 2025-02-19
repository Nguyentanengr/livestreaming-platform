package com.nguyentan.livestream_platform.repository;

import com.nguyentan.livestream_platform.entity.Connection;
import com.nguyentan.livestream_platform.entity.ConnectionId;
import com.nguyentan.livestream_platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, ConnectionId> {
}
