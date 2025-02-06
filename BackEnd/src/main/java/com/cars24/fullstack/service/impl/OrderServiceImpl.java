package com.cars24.fullstack.service.impl;

import com.cars24.fullstack.data.dao.impl.OrderDaoImpl;
import com.cars24.fullstack.data.entity.OrderEntity;
import com.cars24.fullstack.data.request.OrderRequest;
import com.cars24.fullstack.data.response.OrderResponse;
import com.cars24.fullstack.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderDaoImpl orderDao;
    @Override
    public List<OrderEntity> getAllOrders(String userid) {
        return orderDao.getAllOrders(userid);
    }

    @Override
    public OrderResponse createOrder(OrderRequest orderRequest) {
        return orderDao.createOrder(orderRequest);
    }
}
