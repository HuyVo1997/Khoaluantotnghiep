package com.microservice.productservice.Events.Discount;

import lombok.Value;

@Value
public class DiscountUpdatedEvent {
    private String discountID;
    private String email;
    private String orderID;
}
