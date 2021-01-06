package com.microservice.productservice.Controllers.Discount;

import com.microservice.productservice.DTO.DiscountDTO;
import com.microservice.productservice.Model.ProductDiscount;
import com.microservice.productservice.Service.Discount.DiscountCommandService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class DiscountCommandController {

    @Autowired
    private final DiscountCommandService discountCommandService;

    @PostMapping("/code")
    public CompletableFuture<ProductDiscount> createCodeDiscount(
            @RequestBody DiscountDTO discountDTO){
        return this.discountCommandService.createCodeDiscount(discountDTO);
    }

}
