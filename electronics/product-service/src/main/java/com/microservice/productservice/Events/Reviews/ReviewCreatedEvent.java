package com.microservice.productservice.Events.Reviews;

import lombok.Value;

@Value
public class ReviewCreatedEvent {
    private String commentID;
    private String email;
    private String productID;
    private String title;
    private String content;
    private String dateComment;
    private Integer star;
}
