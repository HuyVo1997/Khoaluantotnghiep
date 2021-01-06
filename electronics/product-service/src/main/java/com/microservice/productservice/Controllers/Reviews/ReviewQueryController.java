package com.microservice.productservice.Controllers.Reviews;

import com.microservice.productservice.Model.Review;
import com.microservice.productservice.Service.Reviews.ReviewQueryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class ReviewQueryController {

    @Autowired
    private final ReviewQueryService reviewQueryService;

    @GetMapping("/reviews/{productID}")
    public CompletableFuture<List<Review>> getReviewOfProduct(@PathVariable("productID") String productID){
        return this.reviewQueryService.getReviewOfProduct(productID);
    }

}
