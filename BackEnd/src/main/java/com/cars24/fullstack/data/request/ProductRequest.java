package com.cars24.fullstack.data.request;

 // Import the enum
import com.cars24.fullstack.data.entity.ProductCategoryEnum;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequest {
    private String name;
    private String image;
    private String seller;
    private BigDecimal price;
    private String description;
    private ProductCategoryEnum category;  // New category field
}
