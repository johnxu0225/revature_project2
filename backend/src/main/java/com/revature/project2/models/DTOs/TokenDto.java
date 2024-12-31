package com.revature.project2.models.DTOs;


public class TokenDto {
    String token;

    public TokenDto() {
    }

    public TokenDto(String token) {
        this.token = token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
