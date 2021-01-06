package com.microservice.orderservice.Events.Cart;

import lombok.Value;

@Value
public class QuantityUpdatedEvent {
    private String cartID;
    private Integer quantity;
}
