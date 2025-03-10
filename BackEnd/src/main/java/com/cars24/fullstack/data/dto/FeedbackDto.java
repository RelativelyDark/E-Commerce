package com.cars24.fullstack.data.dto;

import lombok.Data;
import java.io.Serializable;

@Data
public class FeedbackDto implements Serializable {

    private String userId;
    private String productId;
    private int ratings;
    private String comments;

}
