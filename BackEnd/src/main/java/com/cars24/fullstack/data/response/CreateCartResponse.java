package com.cars24.fullstack.data.response;


import lombok.Data;

@Data
public class CreateCartResponse {
    private String productid;
    private String customerid;
    private int quantity;
}
