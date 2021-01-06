package com.microservice.productservice.DTO;

import lombok.Value;

@Value
public class ReviewDTO {
    private String email;
    private String productID;
    private String title;
    private String content;
    private String dateComment;
    private Integer star;
}
