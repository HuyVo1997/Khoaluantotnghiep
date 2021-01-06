package com.microservice.orderservice.Services.Order;

import com.microservice.orderservice.Models.Order;
import com.microservice.orderservice.Query.Order.FindOrderByUser;
import lombok.AllArgsConstructor;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class OrderQueryService {

    @Autowired
    private final QueryGateway queryGateway;

    public CompletableFuture<List<Order>> getListOrderByUser(String user){
        return this.queryGateway.query(new FindOrderByUser(user), ResponseTypes.multipleInstancesOf(Order.class));
    }

}
