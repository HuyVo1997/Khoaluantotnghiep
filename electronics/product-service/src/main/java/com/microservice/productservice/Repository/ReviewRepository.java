package com.microservice.productservice.Repository;

import com.microservice.productservice.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {
    List<Review> getReviewsByProductID(String productID);
    Boolean existsReviewsByProductIDAndEmail(String productID, String email);
    List<Review> getReviewsByProductIDAndEmail(String productID, String email);
}
