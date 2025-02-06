package com.cars24.fullstack.data.entity;


import jakarta.persistence.Id;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "cart")
public class CartEntity {

    @Id
    private ObjectId _id;

    private String productid;
    private String customerid;
    private int quantity;

}
