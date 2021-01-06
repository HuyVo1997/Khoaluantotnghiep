package com.microservice.productservice.Controllers.Product;

import com.microservice.productservice.DTO.ProductDTO;
import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Model.Color;
import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Model.TypeProduct;
import com.microservice.productservice.Service.Product.ProductCommandService;
import lombok.AllArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class ProductCommandController {
    @Autowired
    private final ProductCommandService productCommandService;

    @PutMapping("/{productID}")
    public CompletableFuture<Product> updateProduct(@PathVariable("productID") String productID,
                                                    @RequestBody ProductDTO productDTO){
        return this.productCommandService.updateProduct(productID,productDTO);
    }

    @DeleteMapping("/{productID}")
    public CompletableFuture<Product> deleteProduct(@PathVariable("productID") String productID){
        return this.productCommandService.deleteProduct(productID);
    }
}
