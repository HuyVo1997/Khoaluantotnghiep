package com.microservice.orderservice.Controllers.Cart;

import com.microservice.orderservice.DTO.CartDTO;
import com.microservice.orderservice.DTO.QuantityDTO;
import com.microservice.orderservice.Services.Cart.CartCommandService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class CartCommandController {

    @Autowired
    private final CartCommandService cartCommandService;

    @PostMapping("/cart")
    public void addProductToCart(@RequestBody CartDTO cartDTO){
        this.cartCommandService.addProductToCart(cartDTO);
    }

    @PutMapping("/quantity/{cartID}")
    public void updateQuantityProduct(@PathVariable("cartID") String cartID,
                                      @RequestBody QuantityDTO quantityDTO){
        this.cartCommandService.updateQuantityProduct(cartID,quantityDTO);
    }

    @DeleteMapping("/cart/{cartID}")
    public void deleteProductFromCart(@PathVariable("cartID") String cartID){
        this.cartCommandService.deleteProductFromCart(cartID);
    }
}
