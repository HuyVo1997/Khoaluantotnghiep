package com.microservice.productservice.Repository;

import com.microservice.productservice.Model.TypeProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<TypeProduct,String> {
    TypeProduct findTypeProductByType(String type);
}
