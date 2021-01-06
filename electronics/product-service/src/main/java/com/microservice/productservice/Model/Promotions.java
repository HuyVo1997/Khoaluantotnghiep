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
@Table(name = "promotions")
public class Promotions {
    @Id
    private String promotionID;
    private String name;
    private Integer forPromotion;
    private Integer formPromotion;
    private String dateStart;
    private String dateEnd;
    private Integer status;

    private Double totalBill;
    private Integer promotionValue;
}
