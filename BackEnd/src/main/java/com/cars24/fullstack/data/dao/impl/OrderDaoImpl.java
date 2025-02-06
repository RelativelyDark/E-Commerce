package com.cars24.fullstack.data.dao.impl;

import com.cars24.fullstack.data.dao.OrderDao;
import com.cars24.fullstack.data.entity.OrderEntity;
import com.cars24.fullstack.data.repository.OrderRepository;
import com.cars24.fullstack.data.request.OrderRequest;
import com.cars24.fullstack.data.response.OrderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDaoImpl implements OrderDao {

    private final OrderRepository orderRepository;
    @Override
    public List<OrderEntity> getAllOrders(String userid) {
        List<OrderEntity>orders = orderRepository.findAllByUserid(userid);
        return orders;
    }

    @Override
    public OrderResponse createOrder(OrderRequest orderRequest) {
        OrderEntity orderEntity = new OrderEntity();
        BeanUtils.copyProperties(orderRequest, orderEntity);

        OrderResponse response = new OrderResponse();
        BeanUtils.copyProperties(orderRequest, response);

        orderRepository.save(orderEntity);
        return response;
    }

}
