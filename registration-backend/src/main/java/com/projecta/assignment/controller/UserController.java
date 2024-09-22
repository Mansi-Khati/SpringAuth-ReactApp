package com.projecta.assignment.controller;

import com.projecta.assignment.service.UserService;
import com.projecta.assignment.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            logger.info("Attempting to register user: {}", user.getUsername());
            User registeredUser = userService.registerUser(user);
            logger.info("User registered successfully: {}", registeredUser.getUsername());
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            logger.error("Error registering user: {}", user.getUsername(), e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            logger.info("Attempting to login user: {}", user.getUsername());
            User loggedInUser = userService.loginUser(user.getUsername(), user.getPassword());
            if (loggedInUser != null) {
                logger.info("User logged in successfully: {}", loggedInUser.getUsername());
                return ResponseEntity.ok(loggedInUser);
            } else {
                logger.warn("Login failed for user: {}", user.getUsername());
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid username or password");
            }
        } catch (Exception e) {
            logger.error("Error during login for user: {}", user.getUsername(), e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during login: " + e.getMessage());
        }
    }
}