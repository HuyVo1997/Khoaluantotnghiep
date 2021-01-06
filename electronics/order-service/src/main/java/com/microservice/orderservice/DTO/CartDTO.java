package com.microservice.orderservice.DTO;

import com.microservice.productservice.Model.Product;
import lombok.Value;

import java.util.List;

@Value
public class CartDTO {
    private String user;
    private List<Product> products;
}
