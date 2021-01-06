package com.microservice.orderservice.Controllers.Cart;

import com.microservice.orderservice.Models.Cart;
import com.microservice.orderservice.Models.CartProduct;
import com.microservice.orderservice.Services.Cart.CartQueryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class CartQueryController {

    @Autowired
    private final CartQueryService cartQueryService;

    @GetMapping("/cart/{user}")
    public CompletableFuture<List<CartProduct>> getProductByUser(@PathVariable("user") String user){
        return this.cartQueryService.getProductByUser(user);
    }

}
