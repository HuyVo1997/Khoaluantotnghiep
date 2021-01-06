package com.microservice.productservice.Projection;
import com.microservice.productservice.Commands.Product.CreateProductCommand;
import com.microservice.productservice.DTO.ProductDTO;
import com.microservice.productservice.Events.Phone.PhoneCreatedEvent;
import com.microservice.productservice.Model.PhoneLaptop;
import com.microservice.productservice.Repository.PhoneLaptopRepository;
import lombok.RequiredArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class PhoneProjection {

    @Autowired
    private final PhoneLaptopRepository phoneLaptopRepository;

    @Autowired
    private final CommandGateway commandGateway;

    @EventHandler
    public void on(PhoneCreatedEvent event){

        ProductDTO product = event.getProductDTO();

        PhoneLaptop phone = new PhoneLaptop(
                event.getSpecID(),
                event.getScreen(),
                event.getOs(),
                event.getCamera1(),
                event.getCamera2(),
                event.getCpu(),
                event.getRam(),
                event.getMemory(),
                event.getSim(),
                event.getBattery()
        );

        this.phoneLaptopRepository.save(phone);

        CreateProductCommand productCommand = new CreateProductCommand(UUID.randomUUID().toString(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getQuantity(),
                product.getTypeProduct(),
                product.getBrand(),
                phone,
                product.getImages());

        commandGateway.send(productCommand);
    }
}
