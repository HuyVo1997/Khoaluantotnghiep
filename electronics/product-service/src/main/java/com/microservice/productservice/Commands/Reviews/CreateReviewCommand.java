package com.microservice.productservice.Commands.Reviews;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateReviewCommand {
    @TargetAggregateIdentifier
    private String commentID;
    private String email;
    private String productID;
    private String title;
    private String content;
    private String dateComment;
    private Integer star;
}
