package com.microservice.productservice.Commands.Image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateImageCommand {
    @TargetAggregateIdentifier
    private String imageID;
    private List<String> url;
    private String productID;

    public CreateImageCommand(List<String> url,String productID){
        this.url = url;
        this.productID = productID;
    }
}
