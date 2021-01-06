package com.microservice.productservice.Repository;

import com.microservice.productservice.Model.Promotions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotions,String> {
}
