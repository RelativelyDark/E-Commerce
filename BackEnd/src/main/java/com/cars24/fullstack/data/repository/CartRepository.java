package com.cars24.fullstack.data.repository;

import com.cars24.fullstack.data.entity.CartEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends MongoRepository<CartEntity,ObjectId> {

    CartEntity findByProductidAndCustomerid(String Product_id, String Customer_id);
    List<CartEntity> findByCustomerid(String Customer_id);

}
