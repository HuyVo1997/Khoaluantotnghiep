package com.microservice.productservice.Service.Reviews;

import com.microservice.productservice.Query.GetReviewsByProductQuery;
import com.microservice.productservice.Model.Review;
import lombok.AllArgsConstructor;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class ReviewQueryService {
    @Autowired
    private final QueryGateway queryGateway;

    public CompletableFuture<List<Review>> getReviewOfProduct(String productID){
        return this.queryGateway.query(new GetReviewsByProductQuery(productID),
                ResponseTypes.multipleInstancesOf(Review.class));
    }
}
