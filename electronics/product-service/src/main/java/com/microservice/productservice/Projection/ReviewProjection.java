package com.microservice.productservice.Projection;

import com.microservice.productservice.Repository.ReviewRepository;
import com.microservice.productservice.Events.Reviews.ReviewCreatedEvent;
import com.microservice.productservice.Model.Review;
import com.microservice.productservice.Query.GetReviewsByProductQuery;
import lombok.RequiredArgsConstructor;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class ReviewProjection {
    @Autowired
    private final ReviewRepository reviewRepository;

    @EventHandler
    public void on(ReviewCreatedEvent event){
        Review review = new Review(
                event.getCommentID(),
                event.getEmail(),
                event.getProductID(),
                event.getTitle(),
                event.getContent(),
                event.getDateComment(),
                event.getStar()
        );
        this.reviewRepository.save(review);
    }

    @QueryHandler
    public List<Review> on(GetReviewsByProductQuery query){
        return this.reviewRepository.getReviewsByProductID(query.getProductID());
    }
}
