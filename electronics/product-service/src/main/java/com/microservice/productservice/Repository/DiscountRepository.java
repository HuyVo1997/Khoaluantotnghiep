package com.microservice.productservice.Repository;

import com.microservice.productservice.DTO.DiscountDTO;
import com.microservice.productservice.Model.ProductDiscount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountRepository extends JpaRepository<ProductDiscount,String> {
    ProductDiscount getProductDiscountByDiscountIDAndStatus(String code, Integer status);
}
