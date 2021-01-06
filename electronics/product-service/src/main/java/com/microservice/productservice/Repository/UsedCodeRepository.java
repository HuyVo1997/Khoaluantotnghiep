package com.microservice.productservice.Repository;

import com.microservice.productservice.Model.UsedCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsedCodeRepository extends JpaRepository<UsedCode,String> {
    UsedCode findUsedCodeByEmailAndDiscountID(String email, String discountID);
    UsedCode findUsedCodeByOrderID(String orderID);
}
