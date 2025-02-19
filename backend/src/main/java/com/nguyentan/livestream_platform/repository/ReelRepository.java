package com.nguyentan.livestream_platform.repository;

import com.nguyentan.livestream_platform.entity.Reel;
import com.nguyentan.livestream_platform.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReelRepository extends JpaRepository<Reel, UUID> {
}
