package com.cars24.fullstack.data.entity;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "feedback")
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackEntity {
    @Id
    private String id;
    private String userId;
    private String productId;
    private int ratings;
    private String comments;
}
