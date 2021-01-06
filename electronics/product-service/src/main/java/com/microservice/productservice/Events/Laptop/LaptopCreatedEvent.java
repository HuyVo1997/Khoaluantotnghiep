package com.microservice.productservice.Events.Laptop;

import com.microservice.productservice.DTO.ProductDTO;
import lombok.Value;

@Value
public class LaptopCreatedEvent {
    private String specID;
    private String cpu;
    private String ram;
    private String hardDrive;
    private String screen;
    private String cardScreen;
    private String connector;
    private String os;
    private String material;
    private String size;
    private ProductDTO productDTO;
}
