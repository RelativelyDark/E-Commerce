package com.cars24.fullstack.data.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Valid
public class OrderRequest {

    @NotNull(message = "User id cannot be null")
    private String userid;

    @NotNull(message = "Product id cannot be null")
    private String productid;

    @NotNull(message = "Quantity cannot be null")
    private int quantity;

    @NotNull(message = "Order date cannot be null")
    private String orderDate;
}
