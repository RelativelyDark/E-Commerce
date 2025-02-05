package com.cars24.fullstack.data.request;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;

}
