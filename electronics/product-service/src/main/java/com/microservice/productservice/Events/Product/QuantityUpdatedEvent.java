package com.microservice.productservice.Events.Product;

import lombok.Value;

@Value
public class QuantityUpdatedEvent {
    private String productID;
    private Integer quantity;
}
