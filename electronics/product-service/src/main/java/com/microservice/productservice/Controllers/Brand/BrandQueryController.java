package com.microservice.productservice.Controllers.Brand;

import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Service.Brand.BrandQueryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class BrandQueryController {

    @Autowired
    private final BrandQueryService brandQueryService;

    @GetMapping("/brands")
    public CompletableFuture<List<Brand>> getListBrand(){
        return this.brandQueryService.getListBrand();
    }
}
