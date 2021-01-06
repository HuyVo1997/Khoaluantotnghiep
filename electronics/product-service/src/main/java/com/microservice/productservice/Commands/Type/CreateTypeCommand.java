package com.microservice.productservice.Commands.Type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTypeCommand {
    @TargetAggregateIdentifier
    private String typeID;
    private String type;
}
