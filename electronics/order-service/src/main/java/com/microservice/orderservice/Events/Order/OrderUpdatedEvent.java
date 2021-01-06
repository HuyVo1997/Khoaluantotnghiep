package com.microservice.orderservice.Events.Order;

import lombok.Value;

@Value
public class OrderUpdatedEvent {
    private String orderID;
    private String dateDelivery;
    private Integer status;
}
