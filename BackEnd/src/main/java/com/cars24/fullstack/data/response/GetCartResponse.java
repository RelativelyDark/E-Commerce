package com.cars24.fullstack.data.response;

import lombok.Data;
import org.bson.types.ObjectId;

@Data
public class GetCartResponse {
    private String productid;
    private int quantity;
}
