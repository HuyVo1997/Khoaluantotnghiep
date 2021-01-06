package com.microservice.orderservice.Events.Cart;

import com.microservice.productservice.Model.Product;
import lombok.Value;

import java.util.List;

@Value
public class CartCreatedEvent {
    private String cartID;
    private String user;
    private List<Product> products;
}
