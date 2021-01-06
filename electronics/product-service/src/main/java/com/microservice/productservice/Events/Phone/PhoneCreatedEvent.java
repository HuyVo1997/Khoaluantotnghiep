package com.microservice.productservice.Events.Phone;

import com.microservice.productservice.DTO.ImageDTO;
import com.microservice.productservice.DTO.PhoneDTO;
import com.microservice.productservice.DTO.ProductDTO;
import com.microservice.productservice.Model.Product;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
public class PhoneCreatedEvent {
    private String specID;
    private String screen;
    private String os;
    private String camera1;
    private String camera2;
    private String cpu;
    private String ram;
    private String memory;
    private String sim;
    private String battery;
    private ProductDTO productDTO;
}
