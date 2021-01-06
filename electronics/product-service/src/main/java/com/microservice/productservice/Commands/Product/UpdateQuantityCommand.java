package com.microservice.productservice.Commands.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateQuantityCommand {
    @TargetAggregateIdentifier
    private String productID;
    private Integer quantity;
}
