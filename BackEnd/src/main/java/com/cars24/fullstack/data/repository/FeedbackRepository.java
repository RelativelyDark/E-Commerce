package com.cars24.fullstack.data.repository;

import com.cars24.fullstack.data.dto.FeedbackDto;
import com.cars24.fullstack.data.entity.FeedbackEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends MongoRepository<FeedbackEntity, String> {
    List<Object> findByProductId(String productId);
}
