package com.microservice.orderservice.Controllers.OrderDetails;

import com.microservice.orderservice.Models.CartProduct;
import com.microservice.orderservice.Models.OrderDetails;
import com.microservice.orderservice.Services.Order.OrderQueryService;
import com.microservice.orderservice.Services.OrderDetails.OrderDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@AllArgsConstructor
public class OrderDetailsController {

    @Autowired
    private final OrderDetailsService orderDetailsService;

    @GetMapping("/details/{orderID}")
    public List<CartProduct> getProductInOrder(@PathVariable("orderID") String orderID){
        return this.orderDetailsService.getProductInOrderDetails(orderID);
    }

    @GetMapping("/details/products")
    public List<CartProduct> getAllOrderDetails(){
        return this.orderDetailsService.getAllProductByOrderDetails();
    }
}
