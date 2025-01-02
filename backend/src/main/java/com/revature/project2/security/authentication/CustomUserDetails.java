package com.revature.project2.security.authentication;

import com.revature.project2.models.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

// This class is used by our Custom User Details Manager (CustomUDM)
// We have to create it to provide additional fields to the interface
// such as firstName, lastName etc
public class CustomUserDetails implements UserDetails {

    private final String username;
    private final String password;
    @Getter
    private String email;
    @Getter
    private String firstName;
    @Getter
    private String lastName;
    @Getter
    private List<GrantedAuthority> roles;

    public CustomUserDetails(String username, String password, String email, String firstName, String lastName, String roles) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
    }

    public CustomUserDetails(User user){
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.roles = AuthorityUtils.commaSeparatedStringToAuthorityList(user.getRole());
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public User getUserEntity(){
        String commaSeparatedRoles = roles.stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
        return new User(
                username,
                password,
                email,
                firstName,
                lastName,
                commaSeparatedRoles.isBlank() ? null: commaSeparatedRoles
        );
    }
}
