package com.microservice.productservice.Commands.Color;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateColorCommand {
    @TargetAggregateIdentifier
    private String colorID;
    private String name;
}
