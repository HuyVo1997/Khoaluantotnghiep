package com.microservice.productservice.Aggregate;


import com.microservice.productservice.Commands.Laptop.CreateLaptopCommand;
import com.microservice.productservice.DTO.ProductDTO;
import com.microservice.productservice.Events.Laptop.LaptopCreatedEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

@Aggregate
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LaptopAggregate {
    @AggregateIdentifier
    private String specID;
    private String cpu;
    private String ram;
    private String hardDrive;
    private String screen;
    private String cardScreen;
    private String connector;
    private String os;
    private String material;
    private String size;
    private ProductDTO productDTO;

    @CommandHandler
    public LaptopAggregate(CreateLaptopCommand command){
        AggregateLifecycle.apply(new LaptopCreatedEvent(
                command.getSpecID(),
                command.getCpu(),
                command.getRam(),
                command.getHardDrive(),
                command.getScreen(),
                command.getCardScreen(),
                command.getConnector(),
                command.getOs(),
                command.getMaterial(),
                command.getSize(),
                command.getProductDTO()
        ));
    }

    @EventSourcingHandler
    public void on(LaptopCreatedEvent event){
        this.specID = event.getSpecID();
        this.cpu = event.getCpu();
        this.ram = event.getRam();
        this.hardDrive = event.getHardDrive();
        this.screen = event.getScreen();
        this.cardScreen = event.getCardScreen();
        this.connector = event.getConnector();
        this.os = event.getOs();
        this.material = event.getMaterial();
        this.size = event.getSize();
        this.productDTO = event.getProductDTO();
    }
}
