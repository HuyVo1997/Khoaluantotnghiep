package com.microservice.productservice.Controllers.Discount;

import com.microservice.productservice.Model.ProductDiscount;
import com.microservice.productservice.Service.Discount.DiscountQueryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class DiscountQueryController {

    @Autowired
    private final DiscountQueryService discountQueryService;

    @GetMapping("/code")
    public CompletableFuture<List<ProductDiscount>> getAllDiscount(){
        return discountQueryService.getAllDiscount();
    }

}
