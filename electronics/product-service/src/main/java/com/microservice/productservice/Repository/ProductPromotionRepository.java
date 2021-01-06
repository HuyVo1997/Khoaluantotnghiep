package com.microservice.productservice.Repository;

import com.microservice.productservice.Model.ProductPromotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductPromotionRepository extends JpaRepository<ProductPromotion,String> {
    List<ProductPromotion> findProductPromotionByPromotionID(String promotionID);
}
