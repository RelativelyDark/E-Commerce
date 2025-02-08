package com.cars24.fullstack.data.request;

import lombok.Data;

@Data

public class UserUpdateRequest {
    String phone;
    String city;
    String firstName;
    String lastName;
}
