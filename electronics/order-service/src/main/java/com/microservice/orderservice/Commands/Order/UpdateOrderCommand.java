package com.microservice.orderservice.Commands.Order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateOrderCommand {
    @TargetAggregateIdentifier
    private String orderID;
    private String dateDelivery;
    private Integer status;
}
