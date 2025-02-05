package com.cars24.fullstack.service;

import com.cars24.fullstack.data.dto.UserDto;
import com.cars24.fullstack.data.request.UserUpdateRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    public UserDto createUser(UserDto user);
    public UserDto getUser(String email);
    public UserDto displayCustomer(String userId);

    UserDto updateUser(String id, UserUpdateRequest userUpdateRequest);

    UserDto deleteUser(String id);

    List<UserDto> getAllUsers(int page, int limit);
}