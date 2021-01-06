package com.microservice.productservice.Query;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetProductList {
    private UUID productID;
    private String name;
    private String description;
    private Double price;
    private UUID typeID;
    private String image;
    private Integer quantity;
    private UUID brandID;
}
