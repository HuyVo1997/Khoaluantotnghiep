package com.microservice.productservice.Events.Product;

import lombok.Value;

import java.util.UUID;

@Value
public class ProductDeletedEvent {
    private String productID;
}
