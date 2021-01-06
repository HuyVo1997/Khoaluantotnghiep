package com.microservice.productservice.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PhoneDTO {
    private String screen;
    private String os;
    private String camera1;
    private String camera2;
    private String cpu;
    private String ram;
    private String memory;
    private String sim;
    private String battery;
}
