package com.microservice.productservice.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LaptopDTO {
    private String cpu;
    private String ram;
    private String hardDrive;
    private String screen;
    private String cardScreen;
    private String connector;
    private String os;
    private String material;
    private String size;
}
