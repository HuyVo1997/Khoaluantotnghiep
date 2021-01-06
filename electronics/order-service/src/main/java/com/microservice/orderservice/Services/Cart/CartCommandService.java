package com.microservice.orderservice.Services.Cart;

import com.microservice.orderservice.Commands.Cart.CreateCartCommand;
import com.microservice.orderservice.Commands.Cart.DeleteCartCommand;
import com.microservice.orderservice.Commands.Cart.UpdateQuantityCommand;
import com.microservice.orderservice.DTO.CartDTO;
import com.microservice.orderservice.DTO.QuantityDTO;
import lombok.AllArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class CartCommandService {

    @Autowired
    private final CommandGateway commandGateway;

    public void addProductToCart(CartDTO cartDTO){
        this.commandGateway.send(new CreateCartCommand(
                UUID.randomUUID().toString(),
                cartDTO.getUser(),
                cartDTO.getProducts()
        ));
    }

    public void updateQuantityProduct(String cartID, QuantityDTO quantityDTO){
        this.commandGateway.send(new UpdateQuantityCommand(
                cartID,
                quantityDTO.getQuantity()
        ));
    }

    public void deleteProductFromCart(String cartID){
        this.commandGateway.send(new DeleteCartCommand(
                cartID
        ));
    }

}
