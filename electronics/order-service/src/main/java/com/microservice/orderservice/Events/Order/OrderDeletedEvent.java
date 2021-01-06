package com.microservice.orderservice.Events.Order;

import lombok.Value;

@Value
public class OrderDeletedEvent {
    private String orderID;
}
