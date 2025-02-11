package com.cars24.fullstack.service;

import com.cars24.fullstack.data.dto.FeedbackDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface FeedbackService {
    FeedbackDto createFeedback(FeedbackDto feedbackDto);
    List<FeedbackDto> getAllFeedback();
    Optional<FeedbackDto> getFeedbackById(String id);
    FeedbackDto updateFeedback(String id, FeedbackDto feedbackDto);
    void deleteFeedback(String id);
    List<FeedbackDto> getReviewsByProductId(String productId);
}
