package com.microservice.productservice.Aggregate;

import com.microservice.productservice.Commands.Image.CreateImageCommand;
import com.microservice.productservice.Events.Image.ImageCreatedEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

import java.util.List;

@Aggregate
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ImageAggregate {
    @AggregateIdentifier
    private String imageID;
    private List<String> url;
    private String productID;

    @CommandHandler
    public ImageAggregate(CreateImageCommand command){
        AggregateLifecycle.apply(new ImageCreatedEvent(
                command.getImageID(),
                command.getUrl(),
                command.getProductID()
        ));
    }

    @EventSourcingHandler
    public void on(ImageCreatedEvent event){
        this.imageID = event.getImageID();
        this.url = event.getUrl();
        this.productID = event.getProductID();
    }
}
