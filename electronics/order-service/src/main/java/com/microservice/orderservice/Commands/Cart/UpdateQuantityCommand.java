package com.microservice.orderservice.Commands.Cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateQuantityCommand {
    @TargetAggregateIdentifier
    private String cartID;
    private Integer quantity;
}
