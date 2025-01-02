package com.revature.project2.services;

import com.revature.project2.models.User;
import com.revature.project2.security.UserRoles;
import com.revature.project2.security.authentication.CustomUDM;
import com.revature.project2.security.authentication.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/*
This service will handle user management tasks (creation, update, deletion)
The delegation chain is: UserManagementService -> CustomUDM -> UserService -> UserRepository
This layer validates UserDetails necessary for Spring Security (Roles and password)
*/
@Service
@RequiredArgsConstructor
public class UserManagementService {
    private final CustomUDM userDetailsManager;
    private final AuthenticationService authService;

    public void createUser(User user)  {
       validateRoles(user.getRole());
       userDetailsManager.createUser(new CustomUserDetails(user));
    }

    public void updateUser(User user)  {
        isActionAllowed(user.getUsername());
        validateRoles(user.getRole());
        userDetailsManager.updateUser(new CustomUserDetails(user));
    }

    public void deleteUser(String username) {
        isActionAllowed(username);
        userDetailsManager.deleteUser(username);
    }
 // add restrictions so that only manager can assign higher role for a user. user can assign himself only lower role
    private void validateRoles(String roles){
       List<UserRoles> currentRoles = authService.getAuthenticatedUser().getValue();
       for(String role: roles.split(",")) {
           var newRole = UserRoles.valueOf(role.trim());
           boolean isNewRoleHigherThanAnyPresent = currentRoles.stream().allMatch(curRole->newRole.ordinal()>curRole.ordinal());
           if(isNewRoleHigherThanAnyPresent && currentRoles.contains(UserRoles.ROLE_EMPLOYEE))
               throw new UnsupportedOperationException("You can assign only lower roles than you currently have");
       }
    }

    // this method allows managers to update/delete any users, for employee action can be done only on themselves
    private void isActionAllowed(String username){
        List<UserRoles> currentRoles = authService.getAuthenticatedUser().getValue();
        var isManager = currentRoles.stream().filter(role->role == UserRoles.ROLE_MANAGER).findAny();
        if(isManager.isPresent()) return;

        String currentUser = authService.getAuthenticatedUser().getKey();
        if(!currentUser.equals(username))
            throw new UnsupportedOperationException("This operation can be performed only on the current user");
    }
}
