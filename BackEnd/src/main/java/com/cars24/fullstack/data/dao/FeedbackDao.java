package com.cars24.fullstack.data.dao;

import com.cars24.fullstack.data.dto.FeedbackDto;

import java.util.List;
import java.util.Optional;

public interface FeedbackDao {
    FeedbackDto createFeedback(FeedbackDto feedbackDto);
    List<FeedbackDto> getAllFeedbacks();
    Optional<FeedbackDto> getFeedbackById(String id);
    FeedbackDto updateFeedback(String id, FeedbackDto feedbackDto);
    void deleteFeedback(String id);
    List<FeedbackDto> getReviewsByProductId(String productId);
}
