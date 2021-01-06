package com.microservice.productservice.Service.Type;

import com.microservice.productservice.Commands.Type.CreateTypeCommand;
import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Model.TypeProduct;
import com.microservice.productservice.Repository.ProductRepository;
import com.microservice.productservice.Repository.TypeRepository;
import lombok.AllArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class TypeCommandService {

    @Autowired
    private CommandGateway commandGateway;

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private ProductRepository productRepository;

    public CompletableFuture<TypeProduct> createType(String type) {
        return this.commandGateway.send(new CreateTypeCommand(
                UUID.randomUUID().toString(),
                type
        ));
    }

    public TypeProduct deleteCategory(String typeID){
        Boolean productExists =
                this.productRepository.existsByTypeProduct_TypeID(typeID);

        if(productExists != true){
            this.typeRepository.deleteById(typeID);
            return null;
        }
        else {
            return this.typeRepository.findById(typeID).get();
        }
    }
}
