package com.cars24.fullstack.service.impl;

import com.cars24.fullstack.data.dao.impl.CartDaoImpl;
import com.cars24.fullstack.data.entity.CartEntity;
import com.cars24.fullstack.data.request.CreateCartRequest;
import com.cars24.fullstack.data.request.DeleteCartRequest;
import com.cars24.fullstack.data.request.GetCartRequest;
import com.cars24.fullstack.data.request.UpdateCartRequest;
import com.cars24.fullstack.data.response.CreateCartResponse;
import com.cars24.fullstack.data.response.DeleteCartResponse;
import com.cars24.fullstack.data.response.GetCartResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class CartServiceImpl {

    @Autowired
    CartDaoImpl cartDaoImpl;

    public CreateCartResponse createCart(CreateCartRequest createCartRequest){
        return cartDaoImpl.createCart(createCartRequest);
    }

    public DeleteCartResponse deleteCart(DeleteCartRequest deleteCartRequest){
        return cartDaoImpl.deleteCart(deleteCartRequest);
    }

    public List<CartEntity> getCart(GetCartRequest getCartRequest){
        return cartDaoImpl.getCart(getCartRequest);
    }

    public String updateCart(UpdateCartRequest updateCartRequest){
        return cartDaoImpl.updateCart(updateCartRequest);
    }
}
