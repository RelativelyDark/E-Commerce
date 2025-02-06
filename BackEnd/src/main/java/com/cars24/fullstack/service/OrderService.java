package com.cars24.fullstack.service;

import com.cars24.fullstack.data.entity.OrderEntity;
import com.cars24.fullstack.data.request.OrderRequest;
import com.cars24.fullstack.data.response.OrderResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {

    List<OrderEntity> getAllOrders(String userid);

    OrderResponse createOrder(OrderRequest orderRequest);
}
