package com.microservice.productservice.Events.Product;

import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Model.TypeProduct;
import lombok.Value;

import java.util.UUID;

@Value
public class ProductUpdatedEvent {
    private String productID;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private TypeProduct typeProduct;
    private Brand brand;
}
