package com.cars24.fullstack.data.response;

import lombok.Data;
import org.bson.types.ObjectId;

@Data
public class DeleteCartResponse {
    private ObjectId _id;
    private String productid;
    private String customerid;
    private int quantity;
}
