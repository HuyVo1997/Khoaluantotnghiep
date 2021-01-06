package com.microservice.productservice.Service.Brand;

import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Query.GetBrandList;
import lombok.AllArgsConstructor;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@AllArgsConstructor
@Service
public class BrandQueryService {
    @Autowired
    private QueryGateway queryGateway;

    public CompletableFuture<List<Brand>> getListBrand(){
        return this.queryGateway.query(new GetBrandList(),
                ResponseTypes.multipleInstancesOf(Brand.class));
    }
}
