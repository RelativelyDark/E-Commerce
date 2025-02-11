package com.cars24.fullstack.data.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {
    private String id;
    private String name;
    private String image;
    private String seller;
    private BigDecimal price;
    private String description;


}
