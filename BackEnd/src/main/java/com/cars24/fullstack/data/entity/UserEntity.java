package com.cars24.fullstack.data.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;

@Entity
@Table(name = "users")
@Data

public class UserEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String userId;

    @Length(max = 20, min = 5, message = "Length should be 5-20")
    @Column(nullable = false)
    private String firstName;

    @Length(max = 20, min = 5, message = "Length should be 5-20")
    @Column(nullable = false)
    private String lastName;

    @Length(max = 30, min = 5, message = "Length should be 5-30")
    @Column(nullable = false)
    private String email;

    @NotNull(message = "Password cannot be empty")
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String encryptedPassword;

    private Boolean emailVerificationStatus;

    private String emailVerificationToken;

}
