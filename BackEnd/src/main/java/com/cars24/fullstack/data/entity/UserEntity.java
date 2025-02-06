package com.cars24.fullstack.data.entity;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;  // For MongoDB
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "users")  // MongoDB collection annotation
public class UserEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;  // Use String for MongoDB ID (instead of long)

    @NotNull
    @Indexed(unique = true)
    private String userId = UUID.randomUUID().toString();



    @Length(max = 20, min = 5, message = "Length should be 5-20")
    private String firstName;

    @Length(max = 20, min = 5, message = "Length should be 5-20")
    private String lastName;

    @Length(max = 30, min = 5, message = "Length should be 5-30")
    @Field("email")
    @Indexed(unique = true)
    private String email;


    @NotNull(message = "Password cannot be empty")
    private String password;

    private String encryptedPassword;

    private Boolean emailVerificationStatus;

    private String emailVerificationToken;

    @Getter
    @Field("roles")
    private List<String> roles= new ArrayList<>();

    // Additional fields or relationships can be added here (like roles)
}
