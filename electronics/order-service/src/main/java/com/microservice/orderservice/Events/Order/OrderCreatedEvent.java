package com.microservice.orderservice.Events.Order;

import com.microservice.productservice.Model.Product;
import lombok.Value;

import java.util.List;

@Value
public class OrderCreatedEvent {
    private String orderID;
    private String address;
    private String city;
    private String email;
    private String name;
    private String payment;
    private String phone;
    private String state;
    private Integer status;
    private Double total;
    private String zip;
    private String dateCreate;
    private Integer percent;
    private String discountID;
    private List<Product> products;
}
