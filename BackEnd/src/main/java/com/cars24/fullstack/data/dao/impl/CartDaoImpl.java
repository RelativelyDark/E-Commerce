package com.cars24.fullstack.data.dao.impl;

import com.cars24.fullstack.data.entity.CartEntity;
import com.cars24.fullstack.data.repository.CartRepository;
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

import java.util.ArrayList;
import java.util.List;

@Service

public class CartDaoImpl {

    @Autowired
    CartRepository cartRepository;

    public CreateCartResponse createCart(CreateCartRequest createCartRequest){

        CartEntity cartEntity = new CartEntity();
        cartEntity.setQuantity(createCartRequest.getQuantity());
        cartEntity.setCustomerid(createCartRequest.getCustomerid());
        cartEntity.setProductid(createCartRequest.getProductid());

        cartRepository.save(cartEntity);

        CreateCartResponse createCartResponse = new CreateCartResponse();
        createCartResponse.setCustomerid(createCartRequest.getCustomerid());
        createCartResponse.setQuantity(createCartRequest.getQuantity());
        createCartResponse.setProductid(createCartRequest.getProductid());

        return createCartResponse;

    }

    public DeleteCartResponse deleteCart(DeleteCartRequest deleteCartRequest){
        String Productid = deleteCartRequest.getProductid();
        String Customerid = deleteCartRequest.getCustomerid();
        CartEntity cartEntity = new CartEntity();

        cartEntity = cartRepository.findByProductidAndCustomerid(Productid, Customerid);

        DeleteCartResponse resp = new DeleteCartResponse();
        resp.set_id(cartEntity.get_id());
        resp.setCustomerid(cartEntity.getCustomerid());
        resp.setProductid(cartEntity.getProductid());
        resp.setQuantity(cartEntity.getQuantity());

        return resp;
    }

    public List<CartEntity> getCart(GetCartRequest getCartRequest){

        String customerid = getCartRequest.getCustomerid();
        List<CartEntity> list = cartRepository.findByCustomerid(customerid);

        return list;

    }

    public String updateCart(UpdateCartRequest updateCartRequest){
        String Productid = updateCartRequest.getProductid();
        String Customerid = updateCartRequest.getCustomerid();
        CartEntity cartEntity = new CartEntity();

        cartEntity = cartRepository.findByProductidAndCustomerid(Productid, Customerid);

        cartEntity.setQuantity(updateCartRequest.getQuantity());

        return "Successfully updated quantity to " + cartEntity.getQuantity();

    }
}
