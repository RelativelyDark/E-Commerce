package com.cars24.fullstack.data.dao;

import com.cars24.fullstack.data.dto.ProductDto;
import com.cars24.fullstack.data.entity.ProductEntity;

import java.util.List;
import java.util.Optional;

public interface ProductDao {
    List<ProductEntity> getAllProducts();
    ProductDto getProductById(String id);
    ProductEntity addProduct(ProductEntity productEntity);
    ProductEntity updateProduct(String id, ProductEntity productEntity);
    void deleteProduct(String id);
    List<ProductEntity> getProductByCategory(String category);
    public List<String> getProductCategoryList();
}
