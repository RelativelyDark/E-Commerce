package com.cars24.fullstack.data.dao.impl;

import com.cars24.fullstack.data.dao.ProductDao;
import com.cars24.fullstack.data.entity.ProductEntity;
import com.cars24.fullstack.data.repository.ProductRepository;
import com.cars24.fullstack.data.response.ApiResponse;
import com.cars24.fullstack.exception.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@RequiredArgsConstructor
public class ProductDaoImpl implements ProductDao {

    private final ProductRepository productRepository;

    @Override
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    public List<ProductEntity> getProductByCategory(String category){
        return productRepository.findByCategory(category);
    }

    public List<String> getProductCategoryList(){

        List<ProductEntity> lis = new ArrayList<>();
        lis = productRepository.findAll();

        Set<String> s = new HashSet<>();

        for(ProductEntity  l : lis){
            s.add(String.valueOf(l.getCategory()));
        }

        List<String> cat = new ArrayList<>();

        for(String str : s){
            cat.add(str);
        }

        return cat;

    }

    @Override
    public Optional<ProductEntity> getProductById(String id) {
        return productRepository.findById(id);
    }

    @Override
    public ProductEntity addProduct(ProductEntity productEntity) {
        return productRepository.save(productEntity);
    }

    @Override
    public ProductEntity updateProduct(String id, ProductEntity productEntity) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product not found");
        }
        productEntity.setId(id);  // Ensure the ID is set before saving
        return productRepository.save(productEntity);
    }

    @Override
    public void deleteProduct(String id) {
        ProductEntity productEntity = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
        productRepository.delete(productEntity);
    }

}
