package com.microservice.productservice.Controllers.Brand;

import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Service.Brand.BrandCommandService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class BrandCommandController {

    @Autowired
    private BrandCommandService brandCommandService;

    @PostMapping(value = "/brand")
    public CompletableFuture<Brand> addBrand(@RequestParam("name") String name){
        return this.brandCommandService.createBrand(name);
    }

    @DeleteMapping("/brand/{brandID}")
    public Brand deleteBrand(@PathVariable("brandID") String brandID){
        return this.brandCommandService.deleteBrand(brandID);
    }

    @PutMapping("/brand/{brandID}")
    public void updateStatus(@PathVariable("brandID") String brandID){
        this.brandCommandService.updateStatus(brandID);
    }
}
