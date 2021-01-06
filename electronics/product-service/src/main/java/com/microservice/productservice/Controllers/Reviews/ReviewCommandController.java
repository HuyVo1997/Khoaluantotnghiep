package com.microservice.productservice.Controllers.Reviews;

import com.microservice.productservice.Service.Reviews.ReviewCommandService;
import com.microservice.productservice.DTO.ReviewDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class ReviewCommandController {

    @Autowired
    private final ReviewCommandService reviewCommandService;

    @PostMapping("/review")
    public void createReviewForProduct(@RequestBody ReviewDTO reviewDTO){
        this.reviewCommandService.createCommand(reviewDTO);
    }

}
