package com.revature.project2.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;



@Component
public class JWTAuthFilter extends OncePerRequestFilter {
    private AuthenticationManager authenticationManager;

    public JWTAuthFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader!=null ? authHeader.toLowerCase().contains("bearer") ? authHeader.substring(7) : null : null;
        if(token!=null){
            // authentication logic here
            var result = authenticationManager.authenticate(new JWTAuthObj(token));
            if(result.isAuthenticated()) SecurityContextHolder.getContext().setAuthentication(result);
            System.out.println("Token valid");
        }

        filterChain.doFilter(request,response);
    }
}
