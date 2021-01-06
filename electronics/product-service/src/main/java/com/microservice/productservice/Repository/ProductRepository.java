package com.microservice.productservice.Repository;

import com.microservice.productservice.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> getProductsByBrand_NameAndTypeProduct_Type(String brand, String type);
    Boolean existsProductByBrand_BrandID(String brandID);
    Boolean existsByTypeProduct_TypeID(String typeID);
}
