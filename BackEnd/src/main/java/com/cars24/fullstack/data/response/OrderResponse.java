package com.cars24.fullstack.data.response;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@Valid
public class OrderResponse {
    private int quantity;
    private String orderDate;
}
