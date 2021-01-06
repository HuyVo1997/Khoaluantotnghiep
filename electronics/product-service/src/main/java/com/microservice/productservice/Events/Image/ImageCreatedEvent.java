package com.microservice.productservice.Events.Image;

import lombok.Value;

import java.util.List;

@Value
public class ImageCreatedEvent {
    private String imageID;
    private List<String> url;
    private String productID;
}
