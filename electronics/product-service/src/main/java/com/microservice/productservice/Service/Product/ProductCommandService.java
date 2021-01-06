package com.microservice.productservice.Service.Product;

import com.microservice.productservice.Commands.Color.CreateColorCommand;
import com.microservice.productservice.Commands.Type.CreateTypeCommand;
import com.microservice.productservice.Commands.Product.DeleteProductCommand;
import com.microservice.productservice.Commands.Product.UpdateProductCommand;
import com.microservice.productservice.DTO.ProductDTO;
import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Model.Color;
import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Model.TypeProduct;
import com.microservice.productservice.Repository.BrandRepository;
import com.microservice.productservice.Repository.TypeRepository;
import lombok.AllArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class ProductCommandService {
    @Autowired
    private final CommandGateway commandGateway;

    @Autowired
    private final BrandRepository brandRepository;

    @Autowired
    private final TypeRepository typeRepository;

    public CompletableFuture<Product> updateProduct(String productID, ProductDTO productDTO){

        Brand brand = this.brandRepository.findBrandByName(productDTO.getBrand().getName());

        TypeProduct typeProduct = this.typeRepository.findTypeProductByType(productDTO.getTypeProduct().getType());

        return this.commandGateway.send(new UpdateProductCommand(
                productID,
                productDTO.getName(),
                productDTO.getDescription(),
                productDTO.getPrice(),
                productDTO.getQuantity(),
                typeProduct,
                brand
        ));
    }

    public CompletableFuture<Product> deleteProduct(String productID){
        return this.commandGateway.send(new DeleteProductCommand(
           productID
        ));
    }

    public CompletableFuture<Color> addColor(String name){
        return this.commandGateway.send(new CreateColorCommand(
                UUID.randomUUID().toString(),
                name
        ));
    }

}
