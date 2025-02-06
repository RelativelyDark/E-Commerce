package com.cars24.fullstack.data.dao.impl;

import com.cars24.fullstack.data.dao.ProductDao;
import com.cars24.fullstack.data.entity.ProductEntity;
import com.cars24.fullstack.data.repository.ProductRepository;
import com.cars24.fullstack.exception.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ProductDaoImpl implements ProductDao {

    private final ProductRepository productRepository;

    @Override
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
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
