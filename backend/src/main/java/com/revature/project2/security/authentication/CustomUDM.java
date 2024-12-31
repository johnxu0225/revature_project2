package com.revature.project2.security.authentication;


import com.revature.project2.services.UserServices;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;

// manages user details for Spring Security
@Component
public class CustomUDM implements UserDetailsManager {

    private UserServices userServices;
    private PasswordEncoder passwordEncoder;

    public CustomUDM(UserServices userServices, PasswordEncoder passwordEncoder) {
        this.userServices = userServices;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean userExists(String username) {
        return userServices.userExists(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // loads data or throws UsernameNotFound
        var dbData = userServices.getUserByUsername(username);
        return User.builder()
                .username(dbData.getUsername())
                .password(dbData.getPassword())
                .authorities(dbData.getRole())
                .build();
    }

    // methods below should be implemented to follow up with Spring User Details Manager contract
    @Override
    public void createUser(UserDetails user) {
        if (!(user instanceof CustomUserDetails userDetails))
            throw new IllegalArgumentException("You should provide instance of CustomUserDetails");
        userServices.register(userDetails.getUserEntity());
    }

    @Override
    public void updateUser(UserDetails user) {
        if (!(user instanceof CustomUserDetails userDetails))
            throw new IllegalArgumentException("You should provide instance of CustomUserDetails");
        userServices.register(userDetails.getUserEntity());
    }

    @Override
    public void deleteUser(String username) {
        userServices.deleteByUsername(username);
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        var authObj = SecurityContextHolder.getContext().getAuthentication();
        if(authObj==null) throw new UsernameNotFoundException("Security context is empty");

        String currentUser = authObj.getName();
        var dbData = userServices.getUserByUsername(currentUser);
        if(passwordEncoder.matches(oldPassword,dbData.getPassword()))
            dbData.setPassword(passwordEncoder.encode(newPassword));
        else
            throw new BadCredentialsException("Incorrect Old Password");

        userServices.register(dbData);
    }

}
