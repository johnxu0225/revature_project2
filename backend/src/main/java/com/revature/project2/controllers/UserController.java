package com.revature.project2.controllers;

import com.revature.project2.models.DTOs.TokenDto;
import com.revature.project2.services.AuthenticationService;
import com.revature.project2.services.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revature.project2.models.User;
import com.revature.project2.models.DTOs.IncomingLogin;


@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthenticationService authService;
    private final UserManagementService userManagementService;

    @PostMapping
    public ResponseEntity<TokenDto> login(@RequestBody IncomingLogin user) {
        return ResponseEntity.ok(authService.login(user.username(), user.password()));
    }

    @PostMapping("/register")
    public ResponseEntity<TokenDto> register(@RequestBody User user) {
        userManagementService.createUser(user);
        return ResponseEntity.ok(authService.login(user.getUsername(),user.getPassword()));
    }

    @PatchMapping
    public ResponseEntity<Void> update(@RequestBody User user){
        userManagementService.updateUser(user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody String username){
        userManagementService.deleteUser(username);
        return ResponseEntity.ok().build();
    }

}
