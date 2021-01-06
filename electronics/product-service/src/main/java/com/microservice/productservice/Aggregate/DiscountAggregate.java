package com.microservice.productservice.Aggregate;

import com.microservice.productservice.Commands.Discount.CreateDiscountCommand;
import com.microservice.productservice.Commands.Discount.UpdateDiscountCommand;
import com.microservice.productservice.Events.Discount.DiscountCreatedEvent;
import com.microservice.productservice.Events.Discount.DiscountUpdatedEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

@Aggregate
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class DiscountAggregate {
    @AggregateIdentifier
    private String discountID;
    private String code;
    private Integer percent;
    private Integer limitCode;
    private Integer usesCode;
    private String dateStart;
    private String dateEnd;
    private String email;
    private Integer status;
    private String orderID;

    @CommandHandler
    public DiscountAggregate(CreateDiscountCommand command){
        AggregateLifecycle.apply(new DiscountCreatedEvent(
                command.getDiscountID(),
                command.getCode(),
                command.getPercent(),
                command.getLimitCode(),
                command.getUsesCode(),
                command.getDateStart(),
                command.getDateEnd(),
                command.getStatus()
        ));
    }

    @EventSourcingHandler
    public void on(DiscountCreatedEvent event){
        this.discountID = event.getDiscountID();
        this.code = event.getCode();
        this.percent = event.getPercent();
        this.limitCode = event.getLimitCode();
        this.usesCode = event.getUsesCode();
        this.dateStart = event.getDateStart();
        this.dateEnd = event.getDateEnd();
        this.status = event.getStatus();
    }

    @CommandHandler
    public void handle(UpdateDiscountCommand command){
        AggregateLifecycle.apply(new DiscountUpdatedEvent(
                command.getDiscountID(),
                command.getEmail(),
                command.getOrderID()
        ));
    }

    @EventSourcingHandler
    public void on(DiscountUpdatedEvent event){
        this.discountID = event.getDiscountID();
        this.email = event.getEmail();
        this.orderID = event.getOrderID();
    }
}
