package com.revature.project2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.project2.models.User;
import com.revature.project2.models.DTOs.IncomingLogin;
import com.revature.project2.services.UserServices;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserServices userServices;

    @Autowired
    public UserController(UserServices userServices) {
        this.userServices = userServices;
    }

    // TODO: Spring Security
    @PostMapping
    public ResponseEntity<String> login(@RequestBody IncomingLogin user) {
        User loggedInUser = userServices.login(user);
        return ResponseEntity.ok("Logged in as " + loggedInUser.getUsername());
    }

    // TODO: Spring Security
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User loggedInUser = userServices.register(user);
        return ResponseEntity.ok(loggedInUser);
    }
}
