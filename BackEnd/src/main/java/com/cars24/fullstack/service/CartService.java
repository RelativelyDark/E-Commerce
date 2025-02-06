package com.cars24.fullstack.service;

import com.cars24.fullstack.data.entity.CartEntity;
import com.cars24.fullstack.data.request.CreateCartRequest;
import com.cars24.fullstack.data.request.DeleteCartRequest;
import com.cars24.fullstack.data.request.GetCartRequest;
import com.cars24.fullstack.data.request.UpdateCartRequest;
import com.cars24.fullstack.data.response.CreateCartResponse;
import com.cars24.fullstack.data.response.DeleteCartResponse;
import com.cars24.fullstack.data.response.GetCartResponse;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface CartService {

    public CreateCartResponse createCart(CreateCartRequest createCartRequest);
    public DeleteCartResponse deleteCart(DeleteCartRequest deleteCartRequest);
    public List<CartEntity> getCart(GetCartRequest getCartRequest);
    public String updateCart(UpdateCartRequest updateCartRequest);

}
