package com.microservice.productservice.Controllers.Type;

import com.microservice.productservice.Model.TypeProduct;
import com.microservice.productservice.Service.Type.TypeQueryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class TypeQueryController {
    @Autowired
    private final TypeQueryService typeQueryService;

    @GetMapping("/types")
    public CompletableFuture<List<TypeProduct>> getProductList(){
        return this.typeQueryService.getCategoryList();
    }
}
