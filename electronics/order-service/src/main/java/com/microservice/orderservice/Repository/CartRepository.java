package com.microservice.orderservice.Repository;

import com.microservice.orderservice.Models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart,String> {
    Cart findCartByProductIDAndUser(String productID,String user);
    List<Cart> findCartByUser(String user);
}
