package com.microservice.productservice.Service.Type;

import com.microservice.productservice.Model.TypeProduct;
import com.microservice.productservice.Query.GetCategoryList;
import lombok.AllArgsConstructor;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class TypeQueryService {
    @Autowired
    private final QueryGateway queryGateway;

    public CompletableFuture<List<TypeProduct>> getCategoryList(){
        return this.queryGateway.query(new GetCategoryList(),
                ResponseTypes.multipleInstancesOf(TypeProduct.class));
    }
}
