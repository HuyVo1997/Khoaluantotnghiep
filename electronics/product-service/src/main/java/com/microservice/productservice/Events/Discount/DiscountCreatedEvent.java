package com.microservice.productservice.Events.Discount;

import lombok.Value;

@Value
public class DiscountCreatedEvent {
    private String discountID;
    private String code;
    private Integer percent;
    private Integer limitCode;
    private Integer usesCode;
    private String dateStart;
    private String dateEnd;
    private Integer status;
}
