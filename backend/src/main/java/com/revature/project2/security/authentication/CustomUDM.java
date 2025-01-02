package com.revature.project2.security.authentication;


import com.revature.project2.services.UserServices;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class CustomUDM implements UserDetailsManager {

    private final UserServices userServices;
    private final PasswordEncoder passwordEncoder;

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
        userServices.update(userDetails.getUserEntity());
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
        var dbUserData = userServices.getUserByUsername(currentUser);
        if(passwordEncoder.matches(oldPassword,dbUserData.getPassword()))
            dbUserData.setPassword(passwordEncoder.encode(newPassword));
        else
            throw new BadCredentialsException("Incorrect Old Password");

        userServices.update(dbUserData);
    }

}
