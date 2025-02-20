CREATE DATABASE twitch_db;

USE twitch_db;

CREATE TABLE `role`(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE `user`(
	`id` BINARY(16) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
	`email` VARCHAR(255) DEFAULT NULL,
    `password` VARCHAR(100) DEFAULT NULL,
    `google_id` VARCHAR(255) DEFAULT NULL, 
    `thumbnail` VARCHAR(255) NOT NULL DEFAULT "/default/avatar",
    `bio` TEXT, 
    `status` TINYINT NOT NULL DEFAULT 0, -- 0: OFFLINE, 1: ONLINE --
    `last_login` DATETIME DEFAULT NULL, 
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `is_active` BIT(1) NOT NULL DEFAULT 1,
    `role_id` INT NOT NULL, 
    
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_user_username` (`username`),
	UNIQUE KEY `UK_user_email` (`email`),
	UNIQUE KEY `UK_user_google_id` (`google_id`),
    FOREIGN KEY (`role_id`) REFERENCES role(`id`),
    
    CONSTRAINT `chk_user_username_not_empty` CHECK (`username` <> ''),
    CONSTRAINT `chk_user_username_length` CHECK (CHAR_LENGTH(`username`) >= 6),
    CONSTRAINT `chk_user_email_not_empty` CHECK (`email` <> ''),
    CONSTRAINT `chk_user_email_format` CHECK (`email` REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
    CONSTRAINT `chk_user_password_length` CHECK (CHAR_LENGTH(`password`) >= 8),
    CONSTRAINT `chk_user_google_id_not_empty` CHECK (`google_id` IS NULL OR `google_id` <> ''), 
    CONSTRAINT `chk_user_thumbnail_not_empty` CHECK (`thumbnail` <> ''),
    CONSTRAINT `chk_user_last_login` CHECK (`last_login` IS NULL OR `created_at` <= `last_login`),
    CONSTRAINT `chk_user_created_updated` CHECK (`created_at` <= `updated_at`),
    CONSTRAINT `chk_user_valid_status` CHECK (`status` BETWEEN 0 AND 1)
);

DELIMITER $$

CREATE TRIGGER before_user_update 
BEFORE UPDATE ON `user`
FOR EACH ROW 
BEGIN 
    IF OLD.username <> NEW.username OR 
       OLD.email <> NEW.email OR 
       OLD.password <> NEW.password OR 
       OLD.thumbnail <> NEW.thumbnail OR 
       OLD.bio <> NEW.bio THEN
        SET NEW.updated_at = CURRENT_TIMESTAMP;
    END IF;
    IF OLD.status <> 'online' AND NEW.status = 'online' THEN
        SET NEW.last_login = CURRENT_TIMESTAMP;
    END IF;
END$$

DELIMITER ;


CREATE TABLE `social_link`(
	`id` BINARY(16) NOT NULL, 
    `platform` VARCHAR(50) NOT NULL, 
	`url` VARCHAR(255) NOT NULL,
    `user_id` BINARY(16) NOT NULL,
    `is_active` BIT(1) NOT NULL DEFAULT 1,
    
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_social_link_url` (`url`),
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    
    CONSTRAINT `chk_social_link_platform_not_empty` CHECK (`platform` <> ''),
    CONSTRAINT `chk_social_link_url_not_empty` CHECK (`url` <> '')
);

CREATE TABLE `connection`(
    `following_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `following_id` BINARY(16) NOT NULL, 
    `follower_id` BINARY(16) NOT NULL, 
    
    PRIMARY KEY (`following_id`, `follower_id`),
    FOREIGN KEY (`following_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`follower_id`) REFERENCES user(`id`) ON DELETE CASCADE
);

CREATE TABLE `notification`(
	`id` BINARY(16) NOT NULL,
    `type` TINYINT NOT NULL, -- 0: FOLLOW, 1: MILESTONE
    `content` TEXT NOT NULL, 
    `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `is_read` BIT(1) NOT NULL DEFAULT 0, 
    `user_id` BINARY(16) NOT NULL, 
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    
    CONSTRAINT `chk_notification_content_not_empty` CHECK (`content` <> ''),
    CONSTRAINT `chk_notification_valid_type` CHECK (`type` BETWEEN 0 AND 1)
);

CREATE TABLE `reel`(
	`id` BINARY(16) NOT NULL,  
    `description` TEXT, 
    `thumbnail` VARCHAR(255) NOT NULL,
    `visibility` TINYINT NOT NULL DEFAULT 0, -- 0: ALL, 1: FOLLOWING, 2: FRIENDLY
    `comment_setting` TINYINT NOT NULL DEFAULT 1, -- 0: OFF, 1: ON
    `url` VARCHAR(255), 
	`like_count` INT DEFAULT 0, 
    `share_count` INT DEFAULT 0, 
    `comment_count` INT DEFAULT 0, 
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `is_active` BIT(1) NOT NULL DEFAULT 1,
    `user_id` BINARY(16) NOT NULL, 
    
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_reel_url` (`url`),
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,

    CONSTRAINT `chk_reel_url_not_empty` CHECK (`url` IS NULL OR `url` <> ''),
    CONSTRAINT `chk_reel_thumbnail_not_empty` CHECK (`thumbnail` <> ''),
    CONSTRAINT `chk_reel_valid_visibility` CHECK (`visibility` BETWEEN 0 AND 2),
    CONSTRAINT `chk_reel_valid_comment_setting` CHECK (`comment_setting` BETWEEN 0 AND 1)
);


CREATE TABLE `reel_tag`(
	`id` BINARY(16) NOT NULL,
	`reel_id` BINARY(16), 
    `tag_name` VARCHAR(255), 
    PRIMARY KEY (`id`),
	FOREIGN KEY (`reel_id`) REFERENCES reel(`id`) ON DELETE CASCADE,
    UNIQUE KEY `UK_reel_tag_reel_id_tag_name` (`reel_id`, `tag_name`),
    CONSTRAINT `chk_reel_tag_tag_name_not_empty` CHECK (`tag_name` <> '')
);

CREATE TABLE `comment`(
	`id` BINARY(16) NOT NULL,
    `content` TEXT NOT NULL, 
    `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `like_count` INT DEFAULT 0,
    `reel_id`  BINARY(16) NOT NULL, 
    `user_id`  BINARY(16) NOT NULL, 
    `reply_id`  BINARY(16),
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`reel_id`) REFERENCES reel(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`reply_id`) REFERENCES comment(`id`) ON DELETE CASCADE,
    
    CONSTRAINT `chk_comment_content_not_empty` CHECK (`content` <> '')
);

CREATE TABLE `category` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `interested_count` INT DEFAULT 0,
    
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_category_name` (`name`),
    
    CONSTRAINT `chk_category_name_not_empty` CHECK (`name` <> ''),
    CONSTRAINT `chk_category_thumbnail_not_empty` CHECK (`thumbnail` <> '')
    
);

CREATE TABLE `user_category` (
    `user_id` BINARY(16) NOT NULL, 
    `category_id` INT NOT NULL, 
    PRIMARY KEY (`user_id`, `category_id`), 
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES category(`id`) ON DELETE CASCADE
);

CREATE TABLE `livestream` (
    `id` BINARY(16) NOT NULL,
    `user_id` BINARY(16) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `live_notification` TEXT,
    `thumbnail` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255),
    `chat_setting` TINYINT NOT NULL DEFAULT 1, -- 0: OFF, 1: ON
    `visibility` TINYINT NOT NULL DEFAULT 0, -- 0: ALL, 1: FOLLOWING, 2: FRIENDLY
    `category_id` INT,
    `start_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `end_time` DATETIME,
    `peak_viewer` INT DEFAULT 0,
    `is_active` BIT(1) NOT NULL DEFAULT 1,
    
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_livestream_url` (`url`),
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES category(`id`), 
    
    CONSTRAINT `chk_livestream_title_not_empty` CHECK (`title` <> ''), 
    CONSTRAINT `chk_livestream_thumbnail_not_empty` CHECK (`thumbnail` <> ''), 
    CONSTRAINT `chk_livestream_url_not_empty` CHECK (`url` IS NULL OR `url` <> ''),
    CONSTRAINT `chk_livestream_end_time` CHECK (`end_time` IS NULL OR `start_time` < `end_time`),
    CONSTRAINT `chk_livestream_valid_visibility` CHECK (`visibility` BETWEEN 0 AND 2),
    CONSTRAINT `chk_livestream_chat_setting` CHECK (`chat_setting` BETWEEN 0 AND 1)
);


CREATE TABLE `livestream_tag` (
	`id` BINARY(16) NOT NULL,
    `livestream_id` BINARY(16) NOT NULL,
    `tag_name` VARCHAR(255) NOT NULL,
    
    PRIMARY KEY (`id`),
	UNIQUE KEY `UK_livestream_tag_livestream_id_tag_name` (`livestream_id`, `tag_name`),
    FOREIGN KEY (`livestream_id`) REFERENCES livestream(`id`) ON DELETE CASCADE,
    
    CONSTRAINT `chk_livestream_tag_tag_name_not_empty` CHECK (`tag_name` <> '')
);

CREATE TABLE `viewer` (
    `id` BINARY(16) NOT NULL,
    `user_id` BINARY(16) NOT NULL,
    `livestream_id` BINARY(16) NOT NULL,
    `join_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `leave_time` DATETIME,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`livestream_id`) REFERENCES livestream(`id`) ON DELETE CASCADE,
    
    CONSTRAINT `chk_viewer_leave_time` CHECK (`leave_time` IS NULL OR `leave_time` > `join_time`)
);

CREATE TABLE `chat` (
    `id` BINARY(16) NOT NULL,
    `livestream_id` BINARY(16) NOT NULL,
    `user_id` BINARY(16) NOT NULL,
    `content` TEXT NOT NULL,
    `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`livestream_id`) REFERENCES livestream(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    
    CONSTRAINT `chk_chat_content_not_empty` CHECK (`content` <> '')
);

CREATE TABLE `activity_feed` (
    `id` BINARY(16) NOT NULL,
    `livestream_id` BINARY(16) NOT NULL,
    `user_id` BINARY(16) NOT NULL,
    `type` TINYINT NOT NULL, -- 0: FOLLOW, 1: GIFT
    `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`livestream_id`) REFERENCES livestream(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    
	CONSTRAINT `chk_activity_feed_valid_type` CHECK (`type` BETWEEN 0 AND 1)
);

CREATE TABLE `blocked_chat` (
    `user_id` BINARY(16) NOT NULL,
    `livestream_id` BINARY(16) NOT NULL,
    `block_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `reason` TEXT,
    PRIMARY KEY (`user_id`, `livestream_id`),
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`livestream_id`) REFERENCES livestream(`id`) ON DELETE CASCADE
);

CREATE TABLE `blocked_viewer` (
    `user_id` BINARY(16) NOT NULL,
    `livestream_id` BINARY(16) NOT NULL,
    `blocked_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `reason` TEXT,
    PRIMARY KEY (`user_id`, `livestream_id`),
    FOREIGN KEY (`user_id`) REFERENCES user(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`livestream_id`) REFERENCES livestream(`id`) ON DELETE CASCADE
);


