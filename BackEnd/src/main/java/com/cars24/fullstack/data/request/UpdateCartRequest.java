package com.cars24.fullstack.data.request;

import lombok.Data;

@Data
public class UpdateCartRequest {
    private String productid;
    private String customerid;
    private int quantity;
}


