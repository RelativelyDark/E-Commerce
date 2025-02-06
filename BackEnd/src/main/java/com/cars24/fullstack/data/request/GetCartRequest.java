package com.cars24.fullstack.data.request;

import lombok.Data;
import org.bson.types.ObjectId;

@Data
public class GetCartRequest {

    private String customerid;
    private String productid;
    private ObjectId _id;
    private int quantity;

}
