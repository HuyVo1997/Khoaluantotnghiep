package com.microservice.productservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product_promotions")
public class ProductPromotion {
    @Id
    private String productPromotionID;
    private String productID;
    private String promotionID;
    private Double priceSale;
}
