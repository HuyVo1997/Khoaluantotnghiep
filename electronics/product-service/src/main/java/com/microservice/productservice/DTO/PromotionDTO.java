package com.microservice.productservice.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PromotionDTO {
    private String name;
    private Integer forPromotion;
    private Integer formPromotion;
    private String dateStart;
    private String dateEnd;
    private Integer status;

    private Double totalBill;
    private Integer promotionValue;
    private List<String> giftProduct;
    private List<String> productID;
}
