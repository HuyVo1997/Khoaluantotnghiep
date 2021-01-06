package com.microservice.orderservice.Repository;

import com.microservice.orderservice.Models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,String> {
    List<Order> findOrdersByEmail(String email);
}
