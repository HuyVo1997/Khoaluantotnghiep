package com.microservice.orderservice.Controllers.Order;

import com.microservice.orderservice.Models.Order;
import com.microservice.orderservice.Services.Order.OrderQueryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class OrderQueryController {

    @Autowired
    private final OrderQueryService orderQueryService;

    @GetMapping
    public CompletableFuture<List<Order>> getAllOrder(){

        return this.orderQueryService.getListOrderByUser(null);

    }

    @GetMapping("/{user}")
    public CompletableFuture<List<Order>> getListOrderByUser(@PathVariable("user") String user){
        return this.orderQueryService.getListOrderByUser(user);
    }

}
