package com.revature.project2.controllers;

import com.revature.project2.models.DTOs.OutgoingUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revature.project2.models.User;
import com.revature.project2.models.DTOs.IncomingLogin;
import com.revature.project2.services.UserServices;

import java.util.List;

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

    // TODO: Spring Security
    @GetMapping
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers() {
        return ResponseEntity.ok(userServices.getAllUsers());
    }

    // TODO: Spring Security
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        userServices.deleteUser(id);
        return ResponseEntity.ok("User with id: " + id + " has been deleted");
    }
}
