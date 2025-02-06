package com.cars24.fullstack.data.request;

import lombok.Data;
import java.util.List;

@Data
public class SignUpRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private List<String> roles;  // Add roles field here
}
