package com.microservice.productservice.Service.Brand;

import com.microservice.productservice.Commands.Brand.CreateBrandCommand;
import com.microservice.productservice.Commands.Brand.UpdateBrandCommand;
import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Repository.BrandRepository;
import com.microservice.productservice.Repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class BrandCommandService {

    @Autowired
    private final CommandGateway commandGateway;

    @Autowired
    private final BrandRepository brandRepository;

    @Autowired
    private final ProductRepository productRepository;

    public CompletableFuture<Brand> createBrand(String name){
        return this.commandGateway.send(new CreateBrandCommand(
                UUID.randomUUID().toString(),
                name,
                1
        ));
    }

    public void updateStatus(String brandID){
        this.commandGateway.send(new UpdateBrandCommand(brandID));
    }

    public Brand deleteBrand(String brandID){
        Boolean productExists =
                this.productRepository.existsProductByBrand_BrandID(brandID);

        if(productExists != true){
            this.brandRepository.deleteById(brandID);
            return null;
        }
        else{
            return this.brandRepository.findById(brandID).get();
        }
    }
}
