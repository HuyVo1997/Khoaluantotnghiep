package com.microservice.productservice.Commands.Brand;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBrandCommand {
    @TargetAggregateIdentifier
    private String brandID;
}
