package com.cars24.fullstack.data.dto;

import lombok.Data;

@Data
public class ProductDto {
    private String id;
    private String name;
    private String image;
    private String seller;
    private double price;
    private String description;
}
