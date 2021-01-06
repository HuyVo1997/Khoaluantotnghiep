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
@Table(name = "discounts")
public class ProductDiscount {
    @Id
    private String discountID;
    private String code;
    private Integer percent;
    private Integer limitCode;
    private Integer usesCode;
    private String dateStart;
    private String dateEnd;
    private Integer status;
}
