package com.cars24.fullstack.data.dto;

import lombok.Data;
import java.util.List;

@Data
public class UserDto {
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean emailVerificationStatus;
    private List<String> roles;
}
