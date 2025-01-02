package com.revature.project2.controllers;

import jakarta.annotation.security.RolesAllowed;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @RolesAllowed("MANAGER")
    @GetMapping("test")
    String accessibleOnlyForManagers(){
        return "If you see this, you're a manager";
    }
}
