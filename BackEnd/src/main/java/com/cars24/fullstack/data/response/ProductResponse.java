package com.cars24.fullstack.data.response;

  // Import the enum
import com.cars24.fullstack.data.entity.ProductCategoryEnum;
import lombok.Data;

@Data
public class ProductResponse {
    private String id;
    private String name;
    private String image;
    private String seller;
    private double price;
    private String description;
    private ProductCategoryEnum category;  // New category field
}
