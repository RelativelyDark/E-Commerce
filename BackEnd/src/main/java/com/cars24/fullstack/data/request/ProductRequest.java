package com.cars24.fullstack.data.request;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequest {
    private String name;
    private String image;
    private String seller;
    private BigDecimal price;  // Use BigDecimal instead of double to avoid null issues
    private String description;
}
