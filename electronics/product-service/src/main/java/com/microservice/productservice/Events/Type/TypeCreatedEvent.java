package com.microservice.productservice.Events.Type;

import lombok.Value;

@Value
public class TypeCreatedEvent {
    private String typeID;
    private String type;
}
