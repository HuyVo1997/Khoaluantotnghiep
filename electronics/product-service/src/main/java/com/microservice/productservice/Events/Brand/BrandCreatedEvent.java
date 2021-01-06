package com.microservice.productservice.Events.Brand;

import lombok.Value;

@Value
public class BrandCreatedEvent {
    private String brandID;
    private String name;
    private Integer status;
}
