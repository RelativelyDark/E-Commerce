package com.cars24.fullstack.data.repository;

import com.cars24.fullstack.data.entity.ProductEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<ProductEntity, String> {
    List<ProductEntity> findBySeller(String seller); // Example custom query to find products by seller
}
