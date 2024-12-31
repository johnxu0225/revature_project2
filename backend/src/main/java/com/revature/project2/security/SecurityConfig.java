package com.revature.project2.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.sql.DataSource;

@Configuration
public class SecurityConfig {
    private JWTAuthFilter jwtAuthFilter;
    private AuthenticationEntryPoint authenticationEntryPoint;
    private JWTAuthProvider jwtAuthProvider;


    public SecurityConfig(@Lazy JWTAuthFilter jwtAuthFilter, AuthenticationEntryPoint authenticationEntryPoint, JWTAuthProvider jwtAuthProvider) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.jwtAuthProvider = jwtAuthProvider;
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, UserDetailsManager udManager) throws Exception {
        http
                .authorizeHttpRequests(config -> {
                    // Allow unauthenticated access to the /users endpoint
                    config.requestMatchers(HttpMethod.POST, "/users").permitAll();

                    // All other requests must be authenticated
                    config.anyRequest().authenticated();
                })
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(e->e.authenticationEntryPoint(authenticationEntryPoint))
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Stateless session management
                .httpBasic(Customizer.withDefaults())  // Basic HTTP authentication, if needed
                .csrf(csrf -> csrf.disable());  // Disabling CSRF for stateless applications

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .authenticationProvider(jwtAuthProvider)
                .build();
    }

}

