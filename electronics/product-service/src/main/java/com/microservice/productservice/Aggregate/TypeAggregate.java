package com.microservice.productservice.Aggregate;

import com.microservice.productservice.Commands.Type.CreateTypeCommand;
import com.microservice.productservice.Events.Type.TypeCreatedEvent;
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
public class TypeAggregate {
    @AggregateIdentifier
    private String typeID;
    private String type;

    @CommandHandler
    public TypeAggregate(CreateTypeCommand command){
        AggregateLifecycle.apply(new TypeCreatedEvent(
                command.getTypeID(),
                command.getType()
        ));
    }

    @EventSourcingHandler
    public void on(TypeCreatedEvent event){
        this.typeID = event.getTypeID();
        this.type = event.getType();
    }
}
