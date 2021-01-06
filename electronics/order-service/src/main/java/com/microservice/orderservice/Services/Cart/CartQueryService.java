package com.microservice.orderservice.Services.Cart;

import com.microservice.orderservice.Models.Cart;
import com.microservice.orderservice.Models.CartProduct;
import com.microservice.orderservice.Query.Cart.GetProductFromCart;
import lombok.AllArgsConstructor;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class CartQueryService {

    @Autowired
    private final QueryGateway queryGateway;

    public CompletableFuture<List<CartProduct>> getProductByUser(String user){
        return this.queryGateway.query(new GetProductFromCart(user), ResponseTypes.multipleInstancesOf(CartProduct.class));
    }

}
