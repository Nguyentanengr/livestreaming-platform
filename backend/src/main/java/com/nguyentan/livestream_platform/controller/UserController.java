package com.nguyentan.livestream_platform.controller;

import com.nguyentan.livestream_platform.entity.*;
import com.nguyentan.livestream_platform.repository.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/identity/users")
public class UserController {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ConnectionRepository connectionRepository;
    private final NotificationRepository notificationRepository;
    private final ReelRepository reelRepository;
    private final CommentRepository commentRepository;


    public UserController(@Autowired UserRepository userRepository
            , @Autowired RoleRepository roleRepository
            , @Autowired ConnectionRepository connectionRepository
            , @Autowired NotificationRepository notificationRepository
            , @Autowired ReelRepository reelRepository
            , @Autowired CommentRepository commentRepository
            , @Autowired CategoryRepository categoryRepository) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.connectionRepository = connectionRepository;
        this.notificationRepository = notificationRepository;
        this.reelRepository = reelRepository;
        this.commentRepository = commentRepository;
        this.categoryRepository = categoryRepository;
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

        request.getReelTags().forEach(reelTag -> {
            reelTag.setReel(request);
        });

        return reelRepository.save(request);
    }

    @PostMapping("/comment")
    public Comment createNotification(@RequestBody Comment request) {
        User user = userRepository.findById(request.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Could not find following by id"));
        Reel reel = reelRepository.findById(request.getReel().getId())
                .orElseThrow(() -> new RuntimeException("Could not find reel by id"));

        request.setUser(user);
        request.setReel(reel);
        if (request.getReply() != null) {
            request.setReply(commentRepository.findById(request.getReply().getId())
                    .orElseThrow(() -> new RuntimeException("Could not find comment by id"))
            );
        }

        return commentRepository.save(request);
    }

    @PostMapping("/category")
    public Category createNotification(@RequestBody Category request) {
        return categoryRepository.save(request);
    }

    @GetMapping("/user-category")
    public void createUserCategory() {

        User user = userRepository.findByUsername("tannguyen")
                .orElseThrow(() -> new RuntimeException("Could not find user by username"));

        Category ca1 = categoryRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Could not find category by id"));

        Category ca2 = categoryRepository.findById(2)
                .orElseThrow(() -> new RuntimeException("Could not find category by id"));

        user.getCategories().add(ca1);
        user.getCategories().add(ca2);

        userRepository.save(user);

    }



}
