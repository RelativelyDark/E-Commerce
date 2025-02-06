package com.cars24.fullstack.data.dao;

import com.cars24.fullstack.data.entity.OrderEntity;
import com.cars24.fullstack.data.request.OrderRequest;
import com.cars24.fullstack.data.response.OrderResponse;

import java.util.List;

public interface OrderDao {

    List<OrderEntity> getAllOrders(String userid);

    OrderResponse createOrder(OrderRequest orderRequest);
}
