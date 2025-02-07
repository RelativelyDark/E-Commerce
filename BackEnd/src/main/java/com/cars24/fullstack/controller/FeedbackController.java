package com.cars24.fullstack.controller;

import com.cars24.fullstack.data.dto.FeedbackDto;
import com.cars24.fullstack.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
@Slf4j

public class FeedbackController {

    @Autowired
    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<FeedbackDto> createFeedback(@RequestBody FeedbackDto feedbackDto) {
        log.info("[createUser] FeedbackController{}", feedbackDto);
        return ResponseEntity.ok(feedbackService.createFeedback(feedbackDto));
    }

    @GetMapping
    public ResponseEntity<List<FeedbackDto>> getAllFeedback() {

        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<FeedbackDto>> getFeedbackById(@PathVariable String id) {

        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedbackDto> updateFeedback(@PathVariable String id, @RequestBody FeedbackDto feedbackDto) {
        return ResponseEntity.ok(feedbackService.updateFeedback(id, feedbackDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable String id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.ok("Feedback deleted successfully");
    }

}
