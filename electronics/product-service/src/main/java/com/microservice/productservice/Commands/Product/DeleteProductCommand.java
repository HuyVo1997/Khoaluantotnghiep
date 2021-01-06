package com.microservice.productservice.Commands.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeleteProductCommand {
    @TargetAggregateIdentifier
    private String productID;
}
