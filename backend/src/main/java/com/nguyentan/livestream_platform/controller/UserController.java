package com.nguyentan.livestream_platform.controller;

import com.nguyentan.livestream_platform.entity.*;
import com.nguyentan.livestream_platform.repository.*;
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
    private final ConnectionRepository connectionRepository;
    private final NotificationRepository notificationRepository;
    private final ReelRepository reelRepository;


    public UserController(@Autowired UserRepository userRepository
            , @Autowired RoleRepository roleRepository
            , @Autowired ConnectionRepository connectionRepository
            , @Autowired NotificationRepository notificationRepository
            , @Autowired ReelRepository reelRepository

    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.connectionRepository = connectionRepository;
        this.notificationRepository = notificationRepository;
        this.reelRepository = reelRepository;
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable("username") String username) {
        log.info("GetUserById is running...");
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public User createUser(@RequestBody User request) {
        log.info(request);
        Role role = roleRepository.findById(request.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Could not find role by id"));
        request.setRole(role);
        request.getSocialLinks().forEach(socialLink -> socialLink.setUser(request));
        return userRepository.save(request);
    }

    @GetMapping("/role/{id}")
    public Role getRole(@PathVariable("id") Integer id) {
        return roleRepository.findById(id).orElseThrow(() -> new RuntimeException("Could not find role by id"));
    }

    @PostMapping("/connection")
    public Connection createConnection(@RequestBody Connection request) {
        User following = userRepository.findById(request.getFollowing().getId())
                .orElseThrow(() -> new RuntimeException("Could not find following by id"));
        User follower = userRepository.findById(request.getFollower().getId())
                .orElseThrow(() -> new RuntimeException("Could not find following by id"));

        request.setFollowing(following);
        request.setFollower(follower);

        ConnectionId id = new ConnectionId(following.getId(), follower.getId());
        request.setId(id);


        return connectionRepository.save(request);
    }

    @PostMapping("/notification")
    public Notification createNotification(@RequestBody Notification request) {
        User user = userRepository.findById(request.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Could not find following by id"));

        request.setUser(user);

        return notificationRepository.save(request);
    }

    @PostMapping("/reel")
    public Reel createNotification(@RequestBody Reel request) {
        User user = userRepository.findById(request.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Could not find following by id"));

        request.setUser(user);

        return reelRepository.save(request);
    }



}
