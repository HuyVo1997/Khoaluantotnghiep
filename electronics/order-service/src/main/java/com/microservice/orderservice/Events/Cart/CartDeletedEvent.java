package com.microservice.orderservice.Events.Cart;

import lombok.Value;

@Value
public class CartDeletedEvent {
    private String cartID;
}
