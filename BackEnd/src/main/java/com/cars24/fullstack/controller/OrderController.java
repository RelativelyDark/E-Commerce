package com.cars24.fullstack.controller;

import com.cars24.fullstack.data.entity.OrderEntity;
import com.cars24.fullstack.data.request.OrderRequest;
import com.cars24.fullstack.data.response.OrderResponse;
import com.cars24.fullstack.service.impl.OrderServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderServiceImpl orderService;

    @GetMapping(path = "{userid}")
    public ResponseEntity<List<OrderEntity>> getAllOrders(@PathVariable String userid){
        log.info("OrderController [getAllOrders] {}", userid);
        return ResponseEntity.ok().body(orderService.getAllOrders(userid));
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest){
        log.info("OrderController [createOrder] {}", orderRequest);
        return ResponseEntity.ok().body(orderService.createOrder(orderRequest));
    }

}
