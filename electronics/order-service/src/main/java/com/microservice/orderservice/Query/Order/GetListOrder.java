package com.microservice.orderservice.Query.Order;

import com.microservice.productservice.Model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetListOrder {
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
    private String dateDelivery;
}
