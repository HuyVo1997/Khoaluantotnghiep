package com.microservice.productservice.Aggregate;

import com.microservice.productservice.Commands.Phone.CreatePhoneCommand;
import com.microservice.productservice.DTO.ImageDTO;
import com.microservice.productservice.DTO.PhoneDTO;
import com.microservice.productservice.DTO.ProductDTO;
import com.microservice.productservice.Events.Phone.PhoneCreatedEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

import java.util.List;
import java.util.UUID;

@Aggregate
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PhoneAggregate {
    @AggregateIdentifier
    private String specID;
    private String screen;
    private String os;
    private String camera1;
    private String camera2;
    private String cpu;
    private String ram;
    private String memory;
    private String sim;
    private String battery;
    private ProductDTO productDTO;
    private ImageDTO imageDTO;

    @CommandHandler
    public PhoneAggregate(CreatePhoneCommand command){
        AggregateLifecycle.apply(new PhoneCreatedEvent(
                command.getSpecID(),
                command.getScreen(),
                command.getOs(),
                command.getCamera1(),
                command.getCamera2(),
                command.getCpu(),
                command.getRam(),
                command.getMemory(),
                command.getSim(),
                command.getBattery(),
                command.getProductDTO()
        ));
    }

    @EventSourcingHandler
    public void on(PhoneCreatedEvent event){
        this.specID = event.getSpecID();
        this.screen = event.getScreen();
        this.os = event.getOs();
        this.camera1 = event.getCamera1();
        this.camera2 = event.getCamera2();
        this.cpu = event.getCpu();
        this.ram = event.getRam();
        this.memory = event.getMemory();
        this.sim = event.getSim();
        this.battery = event.getBattery();
        this.productDTO = event.getProductDTO();
    }
}
