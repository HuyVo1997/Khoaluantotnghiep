package com.microservice.productservice.Service.Discount;

import com.microservice.productservice.Model.ProductDiscount;
import com.microservice.productservice.Query.GetAllDiscount;
import lombok.AllArgsConstructor;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class DiscountQueryService {

    @Autowired
    private final QueryGateway queryGateway;

    public CompletableFuture<List<ProductDiscount>> getAllDiscount(){
        return this.queryGateway.query(new GetAllDiscount(), ResponseTypes.multipleInstancesOf(ProductDiscount.class));
    }

}
