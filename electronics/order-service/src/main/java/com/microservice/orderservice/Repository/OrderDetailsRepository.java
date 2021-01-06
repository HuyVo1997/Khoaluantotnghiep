package com.microservice.orderservice.Repository;

import com.microservice.orderservice.Models.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails,String> {
    List<OrderDetails> findOrderDetailsByOrderID(String orderID);
}
