package com.microservice.productservice.DTO;

import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class RecommendProductDTO {
    private Product product;
    private Double rating;
}
