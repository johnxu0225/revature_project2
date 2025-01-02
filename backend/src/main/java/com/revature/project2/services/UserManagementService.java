package com.revature.project2.services;

import com.revature.project2.models.User;
import com.revature.project2.security.UserRoles;
import com.revature.project2.security.authentication.CustomUDM;
import com.revature.project2.security.authentication.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/*
This service handles user management tasks (creation, update, delete)
It also validates UserDetails necessary for Spring Security (Roles and password)
The delegation chain is: UserManagementService -> CustomUDM -> UserService -> UserRepository
*/
@Service
@RequiredArgsConstructor
public class UserManagementService {
    private final CustomUDM userDetailsManager;
    private final AuthenticationService authService;
    private final PasswordEncoder passwordEncoder;

    public void createUser(User user)  {
        if(user.getRole() == null || user.getRole().isBlank()) user.setRole("ROLE_EMPLOYEE");
        validateRoles(user.getRole());
        validatePassword(user.getPassword());
        userDetailsManager.createUser(new CustomUserDetails(user, passwordEncoder));
    }

    public void updateUser(User user)  {
        isActionAllowed(user.getUsername());
        if(user.getRole()!=null) validateRoles(user.getRole());
        validatePassword(user.getPassword());
        userDetailsManager.updateUser(new CustomUserDetails(user, passwordEncoder));
    }

    public void deleteUser(String username) {
        isActionAllowed(username);
        userDetailsManager.deleteUser(username);
    }
    // adds restrictions so that only manager can assign higher role for a employee. employee can assign himself only lower role
    private void validateRoles(String roles){
        // if no user in the context, just check for provided roles
        var currentUser = authService.getAuthenticatedUser();
        if(currentUser.isEmpty()){
            for(String role: roles.split(","))
                UserRoles.valueOf(role.trim());
            return;
        }
       List<UserRoles> currentRoles = currentUser.get().getValue();
       for(String role: roles.split(",")) {
           var newRole = UserRoles.valueOf(role.trim());
           boolean isNewRoleHigherThanAnyPresent = currentRoles.stream().allMatch(curRole->newRole.ordinal()>curRole.ordinal());
           if(isNewRoleHigherThanAnyPresent && currentRoles.contains(UserRoles.ROLE_EMPLOYEE))
               throw new UnsupportedOperationException("You can assign only lower roles than you currently have");
       }
    }

    // this method allows managers to update/delete any user, for employee action can be done only on themselves
    private void isActionAllowed(String username){
        var currentUser = authService.getAuthenticatedUser();
        if(currentUser.isEmpty())
            throw new InsufficientAuthenticationException("You're not authenticated");
        List<UserRoles> currentRoles = currentUser.get().getValue();
        var isManager = currentRoles.stream().filter(role->role.ordinal() > UserRoles.ROLE_EMPLOYEE.ordinal()).findAny();
        if(isManager.isPresent()) return;
        String currentUsername = currentUser.get().getKey();
        if(!currentUsername.equals(username))
            throw new UnsupportedOperationException("This operation can be performed only on the current user");

    }

    private void validatePassword(String password){
        if(password == null || password.length()<8)
            throw new IllegalArgumentException("Password must be at least 8 characters");
    }
}
