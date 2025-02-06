package com.cars24.fullstack.data.entity;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

@Data
@Document(collection = "orders")
public class OrderEntity {

    @Id
    private String id;

    @NotNull
    private String userid;

    @NotNull
    private String productid;

    @NotNull
    private int quantity;

    @NotNull
    private String orderDate;
}
