package com.microservice.productservice.Aggregate;

import com.microservice.productservice.Commands.Brand.CreateBrandCommand;
import com.microservice.productservice.Commands.Brand.UpdateBrandCommand;
import com.microservice.productservice.Events.Brand.BrandCreatedEvent;
import com.microservice.productservice.Events.Brand.BrandUpdatedEvent;
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
public class BrandAggregate {
    @AggregateIdentifier
    private String brandID;
    private String name;
    private Integer status;

    @CommandHandler
    public BrandAggregate(CreateBrandCommand command){
        AggregateLifecycle.apply(new BrandCreatedEvent(
                command.getBrandID(),
                command.getName(),
                command.getStatus()
        ));
    }

    @EventSourcingHandler
    public void handle(BrandCreatedEvent event){
        this.brandID = event.getBrandID();
        this.name = event.getName();
        this.status = event.getStatus();
    }

    @CommandHandler
    public void on(UpdateBrandCommand command){
        AggregateLifecycle.apply(new BrandUpdatedEvent(
               command.getBrandID()
        ));
    }

    @EventSourcingHandler
    public void handle(BrandUpdatedEvent event){
        this.brandID = event.getBrandID();
    }
}
