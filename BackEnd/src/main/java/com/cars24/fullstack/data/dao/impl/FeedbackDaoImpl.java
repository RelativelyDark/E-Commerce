package com.cars24.fullstack.data.dao.impl;

import com.cars24.fullstack.data.dao.FeedbackDao;
import com.cars24.fullstack.data.dto.FeedbackDto;
import com.cars24.fullstack.data.entity.FeedbackEntity;
import com.cars24.fullstack.data.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class FeedbackDaoImpl implements FeedbackDao {


    private final FeedbackRepository feedbackRepository;

    @Override
    public FeedbackDto createFeedback(FeedbackDto feedbackDto) {
        FeedbackEntity entity = new FeedbackEntity();
        BeanUtils.copyProperties(feedbackDto, entity);

        entity.setUserId(feedbackDto.getUserId());

        FeedbackEntity savedEntity = feedbackRepository.save(entity);
        FeedbackDto responseDto = new FeedbackDto();
        BeanUtils.copyProperties(savedEntity, responseDto);
        responseDto.setUserId(entity.getUserId());
        return responseDto;
    }

    @Override
    public List<FeedbackDto> getAllFeedbacks() {
        return feedbackRepository.findAll().stream().map(entity -> {
            FeedbackDto dto = new FeedbackDto();
            BeanUtils.copyProperties(entity, dto);
            dto.setUserId(entity.getUserId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<FeedbackDto> getFeedbackById(String id) {
        return feedbackRepository.findById(id).map(entity -> {
            FeedbackDto dto = new FeedbackDto();
            BeanUtils.copyProperties(entity, dto);
            dto.setUserId(entity.getUserId());
            return dto;
        });
    }

    @Override
    public FeedbackDto updateFeedback(String id, FeedbackDto feedbackDto) {
        if (feedbackRepository.existsById(id)) {
            FeedbackEntity entity = new FeedbackEntity();
            BeanUtils.copyProperties(feedbackDto, entity);
            entity.setId(id);
            FeedbackEntity updatedEntity = feedbackRepository.save(entity);
            FeedbackDto responseDto = new FeedbackDto();
            BeanUtils.copyProperties(updatedEntity, responseDto);
            return responseDto;
        }
        return null;
    }

    @Override
    public void deleteFeedback(String id) {
        feedbackRepository.deleteById(id);
    }
}
