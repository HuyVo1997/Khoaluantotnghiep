package com.microservice.productservice.Service.Discount;

import com.microservice.productservice.Commands.Discount.CreateDiscountCommand;
import com.microservice.productservice.DTO.DiscountDTO;
import com.microservice.productservice.Model.ProductDiscount;
import lombok.AllArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class DiscountCommandService {
    @Autowired
    private final CommandGateway commandGateway;

    public CompletableFuture<ProductDiscount> createCodeDiscount(DiscountDTO discountDTO){
        return this.commandGateway.send(new CreateDiscountCommand(
                UUID.randomUUID().toString(),
                discountDTO.getCode(),
                discountDTO.getPercent(),
                discountDTO.getLimitCode(),
                discountDTO.getUsesCode(),
                discountDTO.getDateStart(),
                discountDTO.getDateEnd(),
                discountDTO.getStatus()
        ));
    }

}
