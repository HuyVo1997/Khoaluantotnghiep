package com.microservice.productservice.Commands.Laptop;


import com.microservice.productservice.DTO.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateLaptopCommand {
    @TargetAggregateIdentifier
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
