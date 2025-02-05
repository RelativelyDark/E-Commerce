package com.cars24.fullstack.service.impl;

import com.cars24.fullstack.data.request.UserUpdateRequest;
import com.cars24.fullstack.util.Utils;
import com.cars24.fullstack.data.dao.UserDao;
import com.cars24.fullstack.data.dto.UserDto;
import com.cars24.fullstack.data.entity.UserEntity;
import com.cars24.fullstack.data.repository.UserRepository;
import com.cars24.fullstack.exception.UserServiceException;
import com.cars24.fullstack.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service

public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Autowired
    Utils utils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDto createUser(UserDto user){

        log.info("[createUser] UserServiceImpl{}", user);

        if(user.getFirstName() == null || user.getLastName() == null || user.getEmail() == null || user.getPassword() == null)
            throw new UserServiceException("Empty fields are not allowed");

        if(userRepository.existsByEmail(user.getEmail()))
            throw new UserServiceException("Record already exists");

        UserEntity userEntity = new UserEntity();

        BeanUtils.copyProperties(user, userEntity);
        userEntity.setUserId(utils.generateUserId(10));
        userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userEntity.setEmailVerificationStatus(false);

        UserDto signUpResponse = userDao.createUser(userEntity);

        return signUpResponse;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UserServiceException {

        log.info("[loadUserByUsername] UserServiceImpl {} ", username);
        UserEntity userEntity = userRepository.findByEmail(username);
        if(userEntity == null)
            throw new UserServiceException("User hasnt signed up");

        return new User(username, userEntity.getEncryptedPassword(), new ArrayList<>());
    }

    public UserDto getUser(String email){

        UserDto response = new UserDto();
        UserEntity userEntity = userRepository.findByEmail(email);

        if(userEntity == null)
            throw new UserServiceException("No entry by the given user id");

        BeanUtils.copyProperties(userEntity, response);
        return response;
    }

    @Override
    public UserDto displayCustomer(String userId) {
        log.info("[display] UserServiceImpl {}", userId);

        return userDao.displayCustomer(userId);
    }

    @Override
    public UserDto updateUser(String id, UserUpdateRequest userUpdateRequest) {
        if(!userRepository.existsByUserId(id)){
            throw new UserServiceException("User not found");
        }

        return userDao.updateUser(id, userUpdateRequest);

    }

    @Override
    public UserDto deleteUser(String id) {

        if(!userRepository.existsByUserId(id)){
            throw new UserServiceException("User not found");
        }

        return userDao.deleteUser(id);
    }

    @Override
    public List<UserDto> getAllUsers(int page, int limit) {

        Pageable pageable = (Pageable) PageRequest.of(page, limit);

        if(page > 0)
            page -= 1;

        List<UserDto> users = new ArrayList<>();

        Page<UserEntity> userPage = userRepository.findAll(pageable);
        List<UserEntity> response = userPage.getContent();

        for(UserEntity res : response){
            UserDto user = new UserDto();
            BeanUtils.copyProperties(res, user);
            users.add(user);
        }

        return users;
    }
}
