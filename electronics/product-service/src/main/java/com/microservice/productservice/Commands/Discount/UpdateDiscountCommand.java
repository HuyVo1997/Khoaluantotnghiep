package com.microservice.productservice.Commands.Discount;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDiscountCommand {
    @TargetAggregateIdentifier
    private String discountID;
    private String email;
    private String orderID;
}
