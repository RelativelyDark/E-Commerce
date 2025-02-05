package com.cars24.fullstack.exception;

public class UserServiceException extends RuntimeException{
    public UserServiceException(String message){
        super(message);
    }
}
