package com.revature.project2.security.authentication;

import com.revature.project2.security.utils.TokenProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JWTAuthProvider implements AuthenticationProvider {

    private final TokenProcessor tokenProcessor;

    @Override
    public Authentication authenticate(Authentication authentication) {
        String token = (String) authentication.getCredentials();
        if ((authentication = tokenProcessor.getAuthObjFromToken(token)) != null) {
            return authentication;
        } else {
            throw new BadCredentialsException("Invalid or expired token");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return JWTAuthObj.class.isAssignableFrom(authentication);
    }
}

