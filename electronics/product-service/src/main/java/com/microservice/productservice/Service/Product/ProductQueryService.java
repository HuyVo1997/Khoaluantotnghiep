package com.microservice.productservice.Service.Product;

import com.microservice.productservice.Model.PhoneLaptop;
import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Query.FindProductQuery;
import com.microservice.productservice.Query.GetProductList;
import com.microservice.productservice.Query.GetProductListByType;
import com.microservice.productservice.Query.GetSpecificationPhoneLaptop;
import lombok.AllArgsConstructor;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@AllArgsConstructor
@Service
public class ProductQueryService {
    @Autowired
    private final QueryGateway queryGateway;

    public CompletableFuture<Product> getProductByID(String productID){
        return this.queryGateway.query(
                new FindProductQuery(productID),
                ResponseTypes.instanceOf(Product.class));
    }

    public CompletableFuture<List<Product>> getProductList(){
        return this.queryGateway.query(new GetProductList(),ResponseTypes.multipleInstancesOf(Product.class));
    }

    public CompletableFuture<List<Product>> getProductListByType(String brand, String type){
        return this.queryGateway.query(new GetProductListByType(brand , type),
                ResponseTypes.multipleInstancesOf(Product.class));
    }

    public CompletableFuture<PhoneLaptop> getSpecification(String productID){
        return this.queryGateway.query(new GetSpecificationPhoneLaptop(productID),
                ResponseTypes.instanceOf(PhoneLaptop.class));
    }
}
