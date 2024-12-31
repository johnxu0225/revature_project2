package com.revature.project2.controllers;

import com.revature.project2.models.DTOs.TokenDto;
import com.revature.project2.security.CustomUDM;
import com.revature.project2.security.JWTAuthObj;
import com.revature.project2.security.TokenProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.revature.project2.models.User;
import com.revature.project2.models.DTOs.IncomingLogin;
import com.revature.project2.services.UserServices;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserServices userServices;
    private TokenProcessor tokenProcessor;
    private CustomUDM userDetailsManager;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserServices userServices, TokenProcessor tokenProcessor, CustomUDM userDetailsManager, PasswordEncoder passwordEncoder) {
        this.userServices = userServices;
        this.tokenProcessor = tokenProcessor;
        this.userDetailsManager = userDetailsManager;
        this.passwordEncoder = passwordEncoder;
    }

    // TODO: Spring Security
    @PostMapping
    public ResponseEntity<TokenDto> login(@RequestBody IncomingLogin user) {
        var userDetails = userDetailsManager.loadUserByUsername(user.username());
        if(passwordEncoder.matches(user.password(),userDetails.getPassword())){
            JWTAuthObj authObj = new JWTAuthObj(userDetails.getUsername(),true,userDetails.getAuthorities());
           var token = tokenProcessor.generateToken(authObj);
            System.out.println(token.getToken());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.ok().build();
    }

    // TODO: Spring Security
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User loggedInUser = userServices.register(user);
        return ResponseEntity.ok(loggedInUser);
    }

    @GetMapping
    public String test(){
        return "Supposed to be secured";
    }
}
