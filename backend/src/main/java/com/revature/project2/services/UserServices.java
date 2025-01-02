package com.revature.project2.services;

import java.util.Optional;

import com.revature.project2.security.utils.ObjectUpdater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
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
        if(!isValidUser(user)) throw new IllegalArgumentException("Invalid user object");
        return userRepo.save(user);
    }

    public void update(User user) {
        var dbData = getUserByUsername(user.getUsername());
        ObjectUpdater.copyNonNullValues(dbData,user);
        if(user.getUserId() == 0){
            var dbUser = getUserByUsername(user.getUsername());
            user.setUserId(dbUser.getUserId());
        }

        if(!isValidUser(user)) throw new IllegalArgumentException("Invalid user object");
        userRepo.save(user);
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

    private boolean isValidUser(User user){
        return
            (user.getFirstName() != null && !user.getFirstName().isBlank())
            && (user.getLastName() != null && !user.getLastName().isBlank())
            && (user.getUsername() != null && !user.getUsername().isBlank())
            && (user.getPassword() != null && user.getPassword().length() >= 8)
            && (user.getEmail() != null && !user.getEmail().isBlank());
    }
}
