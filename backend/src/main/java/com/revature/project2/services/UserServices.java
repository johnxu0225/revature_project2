package com.revature.project2.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.revature.project2.models.User;
import com.revature.project2.models.DTOs.IncomingLogin;
import com.revature.project2.repositories.UserRepository;

@Service
public class UserServices {
    private UserRepository userRepo;

    @Autowired
    public UserServices(UserRepository userRepo) {
        this.userRepo = userRepo;
    }


    public User register(User user) {
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
        Optional<User> foundUser = userRepo.findByUsernameAndPassword(user.username(), user.password());
        if (foundUser.isEmpty()) {
            throw new IllegalArgumentException("Error: Username or password is incorrect");
        }
        return foundUser.get();
    }

    public boolean userExists(String username){
        return userRepo.findByUsername(username).isPresent();
    }

    public User getUserByUsername(String username){
        var dbData = userRepo.findByUsername(username);
        return dbData.orElseThrow(()->new UsernameNotFoundException("User Not Found"));
    }

    public void deleteByUsername(String username){
        var user = userRepo.findByUsername(username);
        if(user.isEmpty()) throw new UsernameNotFoundException("User Not Found");
        userRepo.delete(user.get());
    }
}
