package com.microservice.productservice.Events.Brand;

import lombok.Value;

@Value
public class BrandUpdatedEvent {
    private String brandID;
}
