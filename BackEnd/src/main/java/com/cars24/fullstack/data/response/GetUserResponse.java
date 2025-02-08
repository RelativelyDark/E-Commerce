package com.cars24.fullstack.data.response;

import lombok.Data;

@Data

public class GetUserResponse {
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String city;
    private String phone;
}