package com.cars24.fullstack.advice;

import com.cars24.fullstack.data.response.ApiResponse;
import com.cars24.fullstack.exception.UserServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@ControllerAdvice

class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException exception)
    {
        ApiResponse apiResponse = new ApiResponse();

        log.info("[handleValidationExceptions]");

        Map<String,String> errorMap=new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error->
        {
            errorMap.put(error.getField(),error.getDefaultMessage());
        });

        return ResponseEntity.ok().body(errorMap);
    }

    @ExceptionHandler(UserServiceException.class)
    public ResponseEntity<ApiResponse> handleUserServiceExceptions(UserServiceException exception) {

        log.info("[handleUserServiceExceptions]");

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatuscode(HttpStatus.BAD_REQUEST.value());
        apiResponse.setSuccess(false);
        apiResponse.setMessage(exception.getMessage());
        apiResponse.setService("AppUsr " + HttpStatus.BAD_REQUEST.value());
        apiResponse.setData(null);

        return ResponseEntity.ok().body(apiResponse);
    }
}

