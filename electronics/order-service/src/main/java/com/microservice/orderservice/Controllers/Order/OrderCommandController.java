package com.microservice.orderservice.Controllers.Order;

import com.microservice.orderservice.DTO.OrderDTO;
import com.microservice.orderservice.Models.Order;
import com.microservice.orderservice.Services.Order.OrderCommandService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class OrderCommandController {

    @Autowired
    private final OrderCommandService orderCommandService;

    @PutMapping("/{orderID}")
    public CompletableFuture<Order> updateOrder(@PathVariable("orderID") String orderID, @RequestBody OrderDTO orderDTO){
        return this.orderCommandService.updateOrder(orderID , orderDTO);
    }

    @PostMapping
    public void createOrder(@RequestBody OrderDTO orderDTO){
        this.orderCommandService.createOder(orderDTO);
    }

    @DeleteMapping("/{orderID}")
    public void deleteOrder(@PathVariable("orderID") String orderID){
        this.orderCommandService.deleteOrder(orderID);
    }

}
