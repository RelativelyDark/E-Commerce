package com.cars24.fullstack.service;

import com.cars24.fullstack.data.request.ProductRequest;
import com.cars24.fullstack.data.response.ApiResponse;
import com.cars24.fullstack.data.response.ProductResponse;

import java.util.List;

public interface ProductService {
    ApiResponse getAllProducts();
    ApiResponse getProductById(String id);
    ApiResponse addProduct(ProductRequest productRequest);
    ApiResponse updateProduct(String id, ProductRequest productRequest);
    ApiResponse deleteProduct(String id);
}
