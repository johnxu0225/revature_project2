package com.revature.project2.services;

import com.revature.project2.models.DTOs.IncomingLogin;
import com.revature.project2.models.User;
import com.revature.project2.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServices {
    private final UserRepository userRepo;
    private final Logger logger = LoggerFactory.getLogger(UserServices.class);

    public UserServices(UserRepository userRepo) {
        this.userRepo = userRepo;
    }


    public User register(User user) {
        logger.info("Registering user: " + user);
        if (user.getFirstName() == null || user.getFirstName().isEmpty()) {
            throw new IllegalArgumentException("First name cannot be blank!");
        }
        if (user.getLastName() == null || user.getLastName().isEmpty()) {
            throw new IllegalArgumentException("Last name cannot be blank!");
        }
        // possible TODO: check unique?
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be blank!");
        }
        if (user.getPassword() == null || user.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must have more than 8 characters!");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be blank!");
        }
        return userRepo.save(user);
    }

    public User login(IncomingLogin user) {
        logger.info("Logging in user: " + user);
        Optional<User> foundUser = userRepo.findByUsernameAndPassword(user.username(), user.password());
        if (foundUser.isEmpty()) {
            throw new IllegalArgumentException("Error: Username or password is incorrect");
        }
        return foundUser.get();
    }
}
