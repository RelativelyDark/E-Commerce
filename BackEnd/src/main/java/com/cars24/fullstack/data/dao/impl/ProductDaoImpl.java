package com.cars24.fullstack.data.dao.impl;

import com.cars24.fullstack.data.dao.ProductDao;
import com.cars24.fullstack.data.dto.ProductDto;
import com.cars24.fullstack.data.dto.UserDto;
import com.cars24.fullstack.data.entity.ProductEntity;
import com.cars24.fullstack.data.repository.ProductRepository;
import com.cars24.fullstack.exception.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Repository;

import java.util.*;

@Slf4j
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
    public ProductDto getProductById(String id) {
        Optional<ProductEntity> pe = productRepository.findById(id);
        log.info(String.valueOf(pe));
        //ProductDto productDto = new ProductDto();


        // Check if the product is present
        if (pe.isPresent()) {
            ProductEntity productEntity = pe.get();  // Unwrap the Optional

            // Create a new ProductDto and copy properties from ProductEntity
            ProductDto productDto = new ProductDto();
            BeanUtils.copyProperties(productEntity, productDto);

            System.out.println(productDto);  // To verify the mapping

            return productDto;
        } else {
            // Handle the case where the product is not found
            log.error("Product not found with ID: " + id);
            return new ProductDto();  // Return an empty ProductDto or handle as necessary
        }
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
