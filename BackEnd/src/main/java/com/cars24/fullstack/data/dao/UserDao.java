package com.cars24.fullstack.data.dao;

import com.cars24.fullstack.data.dto.UserDto;
import com.cars24.fullstack.data.entity.UserEntity;
import com.cars24.fullstack.data.request.UserUpdateRequest;

public interface UserDao {

    UserDto createUser(UserEntity user);

    UserDto displayCustomer(String id);

    UserDto updateUser(String id, UserUpdateRequest userUpdateRequest);

    UserDto deleteUser(String id);
}