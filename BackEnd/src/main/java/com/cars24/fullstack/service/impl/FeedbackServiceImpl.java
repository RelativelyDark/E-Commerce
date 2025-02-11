package com.cars24.fullstack.service.impl;

import com.cars24.fullstack.data.dao.FeedbackDao;
import com.cars24.fullstack.data.dto.FeedbackDto;
import com.cars24.fullstack.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private final FeedbackDao feedbackDao;

    @Override
    public FeedbackDto createFeedback(FeedbackDto feedbackDto) {
        return feedbackDao.createFeedback(feedbackDto);
    }

    @Override
    public List<FeedbackDto> getAllFeedback() {
        return feedbackDao.getAllFeedbacks();
    }

    @Override
    public Optional<FeedbackDto> getFeedbackById(String id) {
        return feedbackDao.getFeedbackById(id);
    }

    @Override
    public FeedbackDto updateFeedback(String id, FeedbackDto feedbackDto) {
        return feedbackDao.updateFeedback(id, feedbackDto);
    }

    @Override
    public void deleteFeedback(String id) {
        feedbackDao.deleteFeedback(id);
    }

    @Override
    public List<FeedbackDto> getReviewsByProductId(String productId) {
        return feedbackDao.getReviewsByProductId(productId);  // Fetch reviews based on productId
    }
}
