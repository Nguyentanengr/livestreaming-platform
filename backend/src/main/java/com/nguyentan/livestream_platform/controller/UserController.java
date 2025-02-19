package com.nguyentan.livestream_platform.controller;

import com.nguyentan.livestream_platform.entity.Role;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.repository.RoleRepository;
import com.nguyentan.livestream_platform.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Log4j2
@RestController
@RequestMapping("/identity/users")
public class UserController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserController(@Autowired UserRepository userRepository
            , @Autowired RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") UUID id) {
        log.info("GetUserById is running...");
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public User createUser(@RequestBody User request) {
//        log.info("CreateUser is running...");
//        log.info(request);
//        request.getSocialLinks().forEach(socialLink -> socialLink);
        log.info(request);
        return userRepository.save(request);
    }

    @GetMapping("/role/{id}")
    public Role getRole(@PathVariable("id") Integer id) {
        return roleRepository.findById(id).orElseThrow(() -> new RuntimeException("Could not find role by id"));
    }

}
