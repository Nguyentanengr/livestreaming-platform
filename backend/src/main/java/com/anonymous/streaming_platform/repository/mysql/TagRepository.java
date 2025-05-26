package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    List<Tag> findByNameIn(Iterable<String> tagNames);

}
