package com.cars24.fullstack.data.request;

import lombok.Data;

@Data
public class DeleteCartRequest {
    private String productid;
    private String customerid;
}
