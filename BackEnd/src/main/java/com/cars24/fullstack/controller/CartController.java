package com.cars24.fullstack.controller;

import com.cars24.fullstack.data.entity.CartEntity;
import com.cars24.fullstack.data.request.CreateCartRequest;
import com.cars24.fullstack.data.request.DeleteCartRequest;
import com.cars24.fullstack.data.request.GetCartRequest;
import com.cars24.fullstack.data.request.UpdateCartRequest;
import com.cars24.fullstack.data.response.CreateCartResponse;
import com.cars24.fullstack.data.response.DeleteCartResponse;
import com.cars24.fullstack.data.response.GetCartResponse;
import com.cars24.fullstack.service.impl.CartServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cart")
@Service
@Slf4j

public class CartController {

    @Autowired
    CartServiceImpl cartServiceImpl;

    @PostMapping
    public CreateCartResponse createCart(@RequestBody CreateCartRequest createCartRequest){
        return cartServiceImpl.createCart(createCartRequest);
    }

    @DeleteMapping
    public DeleteCartResponse deleteCart(@RequestBody DeleteCartRequest deleteCartRequest){
        return cartServiceImpl.deleteCart(deleteCartRequest);
    }

    @GetMapping
    public ResponseEntity<List<GetCartResponse>> getCart(@RequestBody GetCartRequest getCartRequest){
        log.info("{}",getCartRequest);
        return ResponseEntity.ok().body(cartServiceImpl.getCart(getCartRequest));
    }

    @PutMapping
    public String updateCart(@RequestBody UpdateCartRequest updateCartRequest){
        return cartServiceImpl.updateCart(updateCartRequest);
    }



}
