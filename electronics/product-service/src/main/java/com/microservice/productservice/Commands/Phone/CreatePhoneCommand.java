package com.microservice.productservice.Commands.Phone;

import com.microservice.productservice.DTO.ImageDTO;
import com.microservice.productservice.DTO.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePhoneCommand {
    @TargetAggregateIdentifier
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
