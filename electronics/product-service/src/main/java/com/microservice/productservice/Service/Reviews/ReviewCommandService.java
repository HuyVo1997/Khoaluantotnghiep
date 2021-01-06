package com.microservice.productservice.Service.Reviews;

import com.microservice.productservice.DTO.ReviewDTO;
import com.microservice.productservice.Commands.Reviews.CreateReviewCommand;
import lombok.AllArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class ReviewCommandService {

    @Autowired
    private final CommandGateway commandGateway;

    public void createCommand(ReviewDTO reviewDTO){
        this.commandGateway.send(new CreateReviewCommand(
                UUID.randomUUID().toString(),
                reviewDTO.getEmail(),
                reviewDTO.getProductID(),
                reviewDTO.getTitle(),
                reviewDTO.getContent(),
                reviewDTO.getDateComment(),
                reviewDTO.getStar()
        ));
    }
}
