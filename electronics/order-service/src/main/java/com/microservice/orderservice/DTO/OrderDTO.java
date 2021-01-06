package com.microservice.orderservice.DTO;

import com.microservice.productservice.Model.Product;
import lombok.Value;

import java.util.List;

@Value
public class OrderDTO {
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
    private String discountID;
    private Integer percent;
    private String dateDelivery;
    private List<Product> products;
}
