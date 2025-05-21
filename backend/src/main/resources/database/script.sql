-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema livestreaming_platform
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema livestreaming_platform
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `livestreaming_platform` DEFAULT CHARACTER SET utf8mb3 ;
USE `livestreaming_platform` ;

-- -----------------------------------------------------
-- Table `livestreaming_platform`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`roles` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `profile_picture` VARCHAR(255) NULL DEFAULT NULL,
  `google_id` VARCHAR(50) NULL DEFAULT NULL,
  `facebook_id` VARCHAR(50) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP NULL DEFAULT NULL,
  `last_login` TIMESTAMP NULL DEFAULT NULL,
  `is_active` TINYINT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_users_roles1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`role_id`)
    REFERENCES `livestreaming_platform`.`roles` (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`live_sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`live_sessions` (
  `live_session_id` BIGINT NOT NULL AUTO_INCREMENT,
  `start_time` TIMESTAMP NOT NULL,
  `end_time` TIMESTAMP NULL DEFAULT NULL,
  `privacy_level` ENUM('public', 'private', 'followers_only') NOT NULL,
  `chat_enable` TINYINT(1) NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`live_session_id`),
  INDEX `fk_live_sessions_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_live_sessions_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`blocked_chats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`blocked_chats` (
  `block_chat_id` INT NOT NULL AUTO_INCREMENT,
  `blocked_time` TIMESTAMP NOT NULL,
  `unblocked_time` TIMESTAMP NULL DEFAULT NULL,
  `reason` VARCHAR(100) NULL DEFAULT NULL,
  `live_session_id` BIGINT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`block_chat_id`),
  INDEX `fk_blocked_chats_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_blocked_chats_live_sessions1_idx` (`live_session_id` ASC) VISIBLE,
  CONSTRAINT `fk_blocked_chats_live_sessions1`
    FOREIGN KEY (`live_session_id`)
    REFERENCES `livestreaming_platform`.`live_sessions` (`live_session_id`),
  CONSTRAINT `fk_blocked_chats_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`blocked_viewers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`blocked_viewers` (
  `blocked_viewer_id` INT NOT NULL AUTO_INCREMENT,
  `blocked_time` TIMESTAMP NOT NULL,
  `unblocked_time` TIMESTAMP NULL DEFAULT NULL,
  `reason` VARCHAR(100) NULL DEFAULT NULL,
  `live_session_id` BIGINT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`blocked_viewer_id`),
  INDEX `fk_blocked_viewers_live_sessions1_idx` (`live_session_id` ASC) VISIBLE,
  INDEX `fk_blocked_viewers_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_blocked_viewers_live_sessions1`
    FOREIGN KEY (`live_session_id`)
    REFERENCES `livestreaming_platform`.`live_sessions` (`live_session_id`),
  CONSTRAINT `fk_blocked_viewers_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`chat_messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`chat_messages` (
  `message_id` BIGINT NOT NULL AUTO_INCREMENT,
  `message_text` VARCHAR(255) NOT NULL,
  `message_time` TIMESTAMP NOT NULL,
  `is_deleted` TINYINT(1) NOT NULL,
  `live_session_id` BIGINT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_chat_messages_live_sessions1_idx` (`live_session_id` ASC) VISIBLE,
  INDEX `fk_chat_messages_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_chat_messages_live_sessions1`
    FOREIGN KEY (`live_session_id`)
    REFERENCES `livestreaming_platform`.`live_sessions` (`live_session_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chat_messages_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`connections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`connections` (
  `connection_id` BIGINT NOT NULL AUTO_INCREMENT,
  `following_at` TIMESTAMP NOT NULL,
  `unfollowing_at` TIMESTAMP NULL DEFAULT NULL,
  `follower_id` INT NOT NULL,
  `following_id` INT NOT NULL,
  PRIMARY KEY (`connection_id`),
  INDEX `fk_connections_users1_idx` (`follower_id` ASC) VISIBLE,
  INDEX `fk_connections_users2_idx` (`following_id` ASC) VISIBLE,
  CONSTRAINT `fk_connections_users1`
    FOREIGN KEY (`follower_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`),
  CONSTRAINT `fk_connections_users2`
    FOREIGN KEY (`following_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`donations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`donations` (
  `donation_id` BIGINT NOT NULL,
  `amount` INT NOT NULL,
  `reason` VARCHAR(100) NULL DEFAULT NULL,
  `donation_time` TIMESTAMP NOT NULL,
  `live_session_id` BIGINT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`donation_id`),
  INDEX `fk_donations_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_donations_live_sessions1_idx` (`live_session_id` ASC) VISIBLE,
  CONSTRAINT `fk_donations_live_sessions1`
    FOREIGN KEY (`live_session_id`)
    REFERENCES `livestreaming_platform`.`live_sessions` (`live_session_id`),
  CONSTRAINT `fk_donations_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`notisfications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`notisfications` (
  `notisfication_id` BIGINT NOT NULL AUTO_INCREMENT,
  `notisfication_type` ENUM('live', 'follower', 'mention') NOT NULL,
  `notisfication_at` TIMESTAMP NOT NULL,
  `is_deleted` TINYINT(1) NOT NULL,
  `receiver_id` INT NOT NULL,
  `sender_id` INT NOT NULL,
  PRIMARY KEY (`notisfication_id`),
  INDEX `fk_notisfications_users1_idx` (`receiver_id` ASC) VISIBLE,
  INDEX `fk_notisfications_users2_idx` (`sender_id` ASC) VISIBLE,
  CONSTRAINT `fk_notisfications_users1`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_notisfications_users2`
    FOREIGN KEY (`sender_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`permissions` (
  `permission_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`permission_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`roles_permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`roles_permissions` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`permission_id`, `role_id`),
  INDEX `fk_roles_permissions_roles_idx` (`role_id` ASC) VISIBLE,
  INDEX `fk_roles_permissions_permissions1_idx` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `fk_roles_permissions_permissions1`
    FOREIGN KEY (`permission_id`)
    REFERENCES `livestreaming_platform`.`permissions` (`permission_id`),
  CONSTRAINT `fk_roles_permissions_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `livestreaming_platform`.`roles` (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`viewers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`viewers` (
  `live_session_id` BIGINT NOT NULL,
  `user_id` INT NOT NULL,
  `join_time` TIMESTAMP NOT NULL,
  `leave_time` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`live_session_id`, `user_id`),
  INDEX `fk_viewers_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_viewers_live_sessions1_idx` (`live_session_id` ASC) VISIBLE,
  CONSTRAINT `fk_viewers_live_sessions1`
    FOREIGN KEY (`live_session_id`)
    REFERENCES `livestreaming_platform`.`live_sessions` (`live_session_id`),
  CONSTRAINT `fk_viewers_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`wallets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`wallets` (
  `wallet_id` INT NOT NULL AUTO_INCREMENT,
  `balance` INT NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`wallet_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  INDEX `fk_wallets_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_wallets_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `livestreaming_platform`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `livestreaming_platform`.`wallet_transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `livestreaming_platform`.`wallet_transactions` (
  `wallet_transaction_id` BIGINT NOT NULL AUTO_INCREMENT,
  `transaction_type` ENUM('deposit', 'withdraw', 'transfer', 'receive') NOT NULL,
  `status` ENUM('success', 'pending', 'failed') NOT NULL,
  `amount` INT NOT NULL,
  `transaction_time` TIMESTAMP NOT NULL,
  `is_deleted` TINYINT(1) NOT NULL,
  `momo_id` VARCHAR(100) NULL DEFAULT NULL,
  `donation_id` BIGINT NULL DEFAULT NULL,
  `wallet_id` INT NOT NULL,
  PRIMARY KEY (`wallet_transaction_id`),
  UNIQUE INDEX `donation_id_UNIQUE` (`donation_id` ASC) VISIBLE,
  INDEX `fk_wallet_transactions_wallets1_idx` (`wallet_id` ASC) VISIBLE,
  INDEX `fk_wallet_transactions_donations1_idx` (`donation_id` ASC) VISIBLE,
  CONSTRAINT `fk_wallet_transactions_donations1`
    FOREIGN KEY (`donation_id`)
    REFERENCES `livestreaming_platform`.`donations` (`donation_id`),
  CONSTRAINT `fk_wallet_transactions_wallets1`
    FOREIGN KEY (`wallet_id`)
    REFERENCES `livestreaming_platform`.`wallets` (`wallet_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

