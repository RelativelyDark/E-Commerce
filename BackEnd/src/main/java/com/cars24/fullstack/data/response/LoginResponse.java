package com.cars24.fullstack.data.response;

import java.util.List;

public class LoginResponse {
    private String token;
    private String userId;
    private List<String> roles;

    public LoginResponse(String token, String userId, List<String> roles) {
        this.token = token;
        this.userId = userId;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public String getUserId() {
        return userId;
    }

    public List<String> getRoles() {
        return roles;
    }
}
