package com.microservice.productservice.Projection;


import com.microservice.productservice.Commands.Product.CreateProductCommand;
import com.microservice.productservice.DTO.ProductDTO;
import com.microservice.productservice.Events.Laptop.LaptopCreatedEvent;
import com.microservice.productservice.Events.Phone.PhoneCreatedEvent;
import com.microservice.productservice.Model.PhoneLaptop;
import com.microservice.productservice.Repository.PhoneLaptopRepository;
import lombok.RequiredArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class LaptopProjection {
    @Autowired
    private final PhoneLaptopRepository phoneLaptopRepository;

    @Autowired
    private final CommandGateway commandGateway;

    @EventHandler
    public void on(LaptopCreatedEvent event){

        ProductDTO product = event.getProductDTO();

        PhoneLaptop laptop = new PhoneLaptop(
                event.getSpecID(),
                event.getCpu(),
                event.getRam(),
                event.getHardDrive(),
                event.getScreen(),
                event.getCardScreen(),
                event.getConnector(),
                event.getOs(),
                event.getMaterial(),
                event.getSize()
        );

        this.phoneLaptopRepository.save(laptop);

        CreateProductCommand productCommand = new CreateProductCommand(UUID.randomUUID().toString(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getQuantity(),
                product.getTypeProduct(),
                product.getBrand(),
                laptop,
                product.getImages());

        commandGateway.send(productCommand);
    }
}
