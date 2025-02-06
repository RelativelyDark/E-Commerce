package com.cars24.fullstack.advice;

import com.cars24.fullstack.data.response.ApiResponse;
import com.cars24.fullstack.exception.InvalidRequestException;
import com.cars24.fullstack.exception.ProductNotFoundException;
import com.cars24.fullstack.exception.UserServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle validation exceptions (for @Valid annotations in controllers)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationExceptions(MethodArgumentNotValidException exception) {
        log.info("[handleValidationExceptions]");

        // Create an error map to capture validation errors
        Map<String, String> errorMap = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error -> {
            errorMap.put(error.getField(), error.getDefaultMessage());
        });

        // Create a response for validation errors
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatuscode(HttpStatus.BAD_REQUEST.value());
        apiResponse.setSuccess(false);
        apiResponse.setMessage("Validation failed");
        apiResponse.setService("AppValidation " + HttpStatus.BAD_REQUEST.value());
        apiResponse.setData(errorMap);

        return ResponseEntity.badRequest().body(apiResponse);
    }

    // Handle UserServiceExceptions
    @ExceptionHandler(UserServiceException.class)
    public ResponseEntity<ApiResponse> handleUserServiceExceptions(UserServiceException exception) {
        log.info("[handleUserServiceExceptions]");

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatuscode(HttpStatus.BAD_REQUEST.value());
        apiResponse.setSuccess(false);
        apiResponse.setMessage(exception.getMessage());
        apiResponse.setService("AppUsr " + HttpStatus.BAD_REQUEST.value());
        apiResponse.setData(null);

        return ResponseEntity.badRequest().body(apiResponse);
    }

    // Handle ProductNotFoundException
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiResponse> handleProductNotFound(ProductNotFoundException exception) {
        log.info("[handleProductNotFound]");

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatuscode(HttpStatus.NOT_FOUND.value());
        apiResponse.setSuccess(false);
        apiResponse.setMessage(exception.getMessage());
        apiResponse.setService("AppProduct " + HttpStatus.NOT_FOUND.value());
        apiResponse.setData(null);

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
    }

    // Handle InvalidRequestException
    @ExceptionHandler(InvalidRequestException.class)
    public ResponseEntity<ApiResponse> handleInvalidRequest(InvalidRequestException exception) {
        log.info("[handleInvalidRequest]");

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatuscode(HttpStatus.BAD_REQUEST.value());
        apiResponse.setSuccess(false);
        apiResponse.setMessage(exception.getMessage());
        apiResponse.setService("AppProduct " + HttpStatus.BAD_REQUEST.value());
        apiResponse.setData(null);

        return ResponseEntity.badRequest().body(apiResponse);
    }

//    // Handle Custom Access Denied Exception
//    @ExceptionHandler(CustomAccessDeniedException.class)
//    public ResponseEntity<ApiResponse> handleAccessDenied(CustomAccessDeniedException exception) {
//        log.info("[handleAccessDenied] Access denied for: " + exception.getMessage());
//
//        ApiResponse apiResponse = new ApiResponse();
//        apiResponse.setStatuscode(HttpStatus.FORBIDDEN.value());
//        apiResponse.setSuccess(false);
//        apiResponse.setMessage(exception.getMessage());
//        apiResponse.setService("AppAuthorization " + HttpStatus.FORBIDDEN.value());
//        apiResponse.setData(null);
//
//        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
//    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<ApiResponse> handleAuthorizationDenied(AuthorizationDeniedException exception) {
        log.info("[handleAuthorizationDenied] Access Denied: " + exception.getMessage());

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatuscode(HttpStatus.FORBIDDEN.value()); // 403 Forbidden
        apiResponse.setSuccess(false);
        apiResponse.setMessage(exception.getMessage());
        apiResponse.setService("AppAuthorization " + HttpStatus.FORBIDDEN.value());
        apiResponse.setData(null);

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
    }

    // Handle any unexpected exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGeneralException(Exception exception) {
        log.error("[handleGeneralException] Unexpected error", exception);

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setStatuscode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        apiResponse.setSuccess(false);
        apiResponse.setMessage("An unexpected error occurred");
        apiResponse.setService("AppGeneral " + HttpStatus.INTERNAL_SERVER_ERROR.value());
        apiResponse.setData(null);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }
}
