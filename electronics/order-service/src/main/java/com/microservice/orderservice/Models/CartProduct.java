package com.microservice.orderservice.Models;

import com.microservice.productservice.Model.Images;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartProduct {
    private String cartID;
    private String productID;
    private String name;
    private Integer quantity;
    private Double price;
    private List<Images> images;
}
