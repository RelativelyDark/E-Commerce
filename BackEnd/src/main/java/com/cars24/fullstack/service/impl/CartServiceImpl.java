package com.cars24.fullstack.service.impl;

import com.cars24.fullstack.data.dao.impl.CartDaoImpl;
import com.cars24.fullstack.data.entity.CartEntity;
import com.cars24.fullstack.data.repository.CartRepository;
import com.cars24.fullstack.data.request.CreateCartRequest;
import com.cars24.fullstack.data.request.DeleteCartRequest;
import com.cars24.fullstack.data.request.GetCartRequest;
import com.cars24.fullstack.data.request.UpdateCartRequest;
import com.cars24.fullstack.data.response.CreateCartResponse;
import com.cars24.fullstack.data.response.DeleteCartResponse;
import com.cars24.fullstack.data.response.GetCartResponse;
import com.cars24.fullstack.exception.CartNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@Slf4j

public class CartServiceImpl {

    @Autowired
    CartDaoImpl cartDaoImpl;

    @Autowired
    CartRepository cartRepository;

    public CreateCartResponse createCart(CreateCartRequest createCartRequest){
        return cartDaoImpl.createCart(createCartRequest);
    }

    public DeleteCartResponse deleteCart(DeleteCartRequest deleteCartRequest){

        if(!cartRepository.existsByProductid(deleteCartRequest.getProductid())){
            throw new CartNotFoundException("No cart exists for this product");
        }

        if(!cartRepository.existsByCustomerid(deleteCartRequest.getCustomerid())){
            throw new CartNotFoundException("No cart exists for this customer ");
        }

        return cartDaoImpl.deleteCart(deleteCartRequest);
    }

    public List<GetCartResponse> getCart(String customerid){

          log.info("{}",cartRepository.findByCustomerid("980890"));
//        if(!cartRepository.existsByCustomerid(getCartRequest.getCustomerid())){
//            throw new CartNotFoundException("No cart exists for this customer ");
//        }

        return cartDaoImpl.getCart(customerid);
    }

    public String updateCart(UpdateCartRequest updateCartRequest){

        if(!cartRepository.existsByProductid(updateCartRequest.getProductid())){
            throw new CartNotFoundException("No cart exists for this product");
        }

        if(!cartRepository.existsByCustomerid(updateCartRequest.getCustomerid())){
            throw new CartNotFoundException("No cart exists for this customer ");
        }

        return cartDaoImpl.updateCart(updateCartRequest);
    }
}
