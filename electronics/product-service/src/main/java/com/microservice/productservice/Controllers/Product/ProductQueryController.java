package com.microservice.productservice.Controllers.Product;

import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Service.Product.ProductQueryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class ProductQueryController {

    @Autowired
    private ProductQueryService productQueryService;

    @GetMapping("/{productID}")
    public CompletableFuture<Product> getProductByID(@PathVariable("productID") String productID){
        return this.productQueryService.getProductByID(productID);
    }

    @GetMapping(value = "/{brand}/{type}")
    public CompletableFuture<List<Product>> getProductByType(@PathVariable("brand") String brand,
                                                             @PathVariable("type") String type){
        return this.productQueryService.getProductListByType(brand, type);
    }

    @GetMapping
    public CompletableFuture<List<Product>> getProductList(){
        return this.productQueryService.getProductList();
    }
}
