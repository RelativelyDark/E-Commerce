package com.cars24.fullstack.controller;

import com.cars24.fullstack.data.dto.UserDto;
import com.cars24.fullstack.data.request.SignUpRequest;
import com.cars24.fullstack.data.request.UserUpdateRequest;
import com.cars24.fullstack.data.response.GetUserResponse;
import com.cars24.fullstack.data.response.SignUpResponse;
import com.cars24.fullstack.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@Service

public class UserController {

    @Autowired
    UserService userService;


    @GetMapping(path = "/display/{id}")
    public GetUserResponse getUser(@PathVariable("id") String id){

        log.info("[UserController] GetUserResponse {}", id);

        UserDto userDto = new UserDto();
        UserDto userDetails = userService.displayCustomer(id);

        GetUserResponse getUserResponse = new GetUserResponse();
        BeanUtils.copyProperties(userDetails, getUserResponse);

        return getUserResponse;
    }


    @PostMapping("/signup")
    public SignUpResponse createUser(@RequestBody SignUpRequest signUpRequest){

        log.info("[createUser] UserController{}", signUpRequest);

        UserDto userDto = new UserDto();
        SignUpResponse signUpResponse = new SignUpResponse();

        BeanUtils.copyProperties(signUpRequest, userDto);

        UserDto createdUser = userService.createUser(userDto);
        BeanUtils.copyProperties(createdUser, signUpResponse);

        return signUpResponse;
    }


    @PutMapping("/edit/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") String id, @RequestBody UserUpdateRequest userUpdateRequest){

        UserDto userDto = new UserDto();

        UserDto updatedUser = userService.updateUser(id, userUpdateRequest);

        return ResponseEntity.ok().body(updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable("id") String id){

        UserDto userDto = new UserDto();

        UserDto deletedUser = userService.deleteUser(id);

        return ResponseEntity.ok().body(deletedUser);
    }

    @GetMapping("/displayUsers")
    public ResponseEntity<List<GetUserResponse>> getAllUsers(@RequestParam(value = "page", defaultValue = "1") int page,
                                                             @RequestParam(value = "limit", defaultValue = "2") int limit){
        List<GetUserResponse> responses = new ArrayList<>();

        List<UserDto> users = userService.getAllUsers(page, limit);

        for(UserDto userDto : users){
            GetUserResponse res = new GetUserResponse();
            BeanUtils.copyProperties(userDto, res);
            responses.add(res);
        }

        return ResponseEntity.ok().body(responses);

    }
}