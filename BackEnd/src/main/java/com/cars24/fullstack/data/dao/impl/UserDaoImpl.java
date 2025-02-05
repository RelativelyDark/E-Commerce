package com.cars24.fullstack.data.dao.impl;

import com.cars24.fullstack.data.dao.UserDao;
import com.cars24.fullstack.data.dto.UserDto;
import com.cars24.fullstack.data.entity.UserEntity;
import com.cars24.fullstack.data.request.UserUpdateRequest;
import com.cars24.fullstack.util.Utils;
import com.cars24.fullstack.data.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j

public class UserDaoImpl implements UserDao {

    @Autowired
    UserRepository userRepository;

    @Autowired
    Utils utils;

    @Override
    public UserDto createUser(UserEntity userEntity) {

        log.info("[createUser] UserDaoImpl{}", userEntity);

        UserEntity response = userRepository.save(userEntity);

        UserDto signUpResponse = new UserDto();
        BeanUtils.copyProperties(userEntity, signUpResponse);

        return signUpResponse;

    }

    @Override
    public UserDto displayCustomer(String id) {

        log.info("[displayCustomer] UserDaoImpl {}", id);

        UserDto userDto = new UserDto();
        UserEntity userEntity = userRepository.findByUserId(id);
        BeanUtils.copyProperties(userEntity, userDto);
        return userDto;
    }

    @Override
    public UserDto updateUser(String id, UserUpdateRequest userUpdateRequest) {
        UserEntity userEntity = userRepository.findByUserId(id);

        if(userUpdateRequest.getFirstName() != null)
            userEntity.setFirstName(userUpdateRequest.getFirstName());

        if(userUpdateRequest.getLastName() != null)
            userEntity.setLastName(userUpdateRequest.getLastName());

        userRepository.save(userEntity);

        UserDto response = new UserDto();
        BeanUtils.copyProperties(userEntity, response);

        return response;
    }

    @Transactional
    @Override
    public UserDto deleteUser(String id) {

        log.info("[deleteCustomer] UserDaoImpl {}", id);

        UserEntity userEntity = userRepository.findByUserId(id);
        UserDto response = new UserDto();

        BeanUtils.copyProperties(userEntity, response);

        userRepository.deleteByUserId(id);
        return response;

    }
}
