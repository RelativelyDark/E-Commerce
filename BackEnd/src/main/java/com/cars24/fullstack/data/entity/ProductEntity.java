package com.cars24.fullstack.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "products")
public class ProductEntity {
    @Id
    private String id;
    private String name;
    private String image;
    private String seller;
    private BigDecimal price;
    private String description;

    @Field("category")
    private ProductCategoryEnum category;
}
