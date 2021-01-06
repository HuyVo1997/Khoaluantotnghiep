package com.microservice.orderservice.Services.Order;

import com.microservice.orderservice.Commands.Order.CreateOrderCommand;
import com.microservice.orderservice.Commands.Order.DeleteOrderCommand;
import com.microservice.orderservice.Commands.Order.UpdateOrderCommand;
import com.microservice.orderservice.DTO.OrderDTO;
import com.microservice.orderservice.Models.Order;
import lombok.AllArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class OrderCommandService {

    @Autowired
    private final CommandGateway commandGateway;

    public void createOder(OrderDTO orderDTO){

        this.commandGateway.send(new CreateOrderCommand(
                UUID.randomUUID().toString(),
                orderDTO.getAddress(),
                orderDTO.getCity(),
                orderDTO.getEmail(),
                orderDTO.getName(),
                orderDTO.getPayment(),
                orderDTO.getPhone(),
                orderDTO.getState(),
                orderDTO.getStatus(),
                orderDTO.getTotal(),
                orderDTO.getZip(),
                orderDTO.getDateCreate(),
                orderDTO.getDiscountID(),
                orderDTO.getPercent(),
                orderDTO.getProducts()
        ));
    }

    public void deleteOrder(String orderID){
        this.commandGateway.send(new DeleteOrderCommand(
                orderID
        ));
    }

    public CompletableFuture<Order> updateOrder(String orderID, OrderDTO orderDTO){
        return this.commandGateway.send(new UpdateOrderCommand(
                orderID,
                orderDTO.getDateDelivery(),
                orderDTO.getStatus()
        ));
    }
}
