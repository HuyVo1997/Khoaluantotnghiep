package com.microservice.orderservice.Aggregate;

import com.microservice.orderservice.Commands.Order.CreateOrderCommand;
import com.microservice.orderservice.Commands.Order.DeleteOrderCommand;
import com.microservice.orderservice.Commands.Order.UpdateOrderCommand;
import com.microservice.orderservice.Events.Order.OrderCreatedEvent;
import com.microservice.orderservice.Events.Order.OrderDeletedEvent;
import com.microservice.orderservice.Events.Order.OrderUpdatedEvent;
import com.microservice.productservice.Model.Product;
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
public class OrderAggregate {
    @AggregateIdentifier
    private String orderID;
    private String address;
    private String city;
    private String email;
    private String name;
    private String payment;
    private String phone;
    private String state;
    private Integer status;
    private Double total;
    private String zip;
    private String dateCreate;
    private String discountID;
    private String dateDelivery;
    private Integer percent;
    private List<Product> products;

    @CommandHandler
    public OrderAggregate(CreateOrderCommand command){
        AggregateLifecycle.apply(new OrderCreatedEvent(
                command.getOrderID(),
                command.getAddress(),
                command.getCity(),
                command.getEmail(),
                command.getName(),
                command.getPayment(),
                command.getPhone(),
                command.getState(),
                command.getStatus(),
                command.getTotal(),
                command.getZip(),
                command.getDateCreate(),
                command.getPercent(),
                command.getDiscountID(),
                command.getProducts()
        ));
    }

    @EventSourcingHandler
    public void on(OrderCreatedEvent event){
        this.orderID = event.getOrderID();
        this.address = event.getAddress();
        this.city = event.getCity();
        this.email = event.getEmail();
        this.name = event.getName();
        this.payment = event.getPayment();
        this.phone = event.getPhone();
        this.state = event.getState();
        this.status = event.getStatus();
        this.total = event.getTotal();
        this.zip = event.getZip();
        this.dateCreate = event.getDateCreate();
        this.discountID = event.getDiscountID();
        this.percent = event.getPercent();
        this.products = event.getProducts();
    }

    @CommandHandler
    public void handle(DeleteOrderCommand command){
        AggregateLifecycle.apply(new OrderDeletedEvent(
                command.getOrderID()
        ));
    }

    @EventSourcingHandler
    public void on(OrderDeletedEvent event){
        this.orderID = event.getOrderID();
    }

    @CommandHandler
    public void handle(UpdateOrderCommand command){
        AggregateLifecycle.apply(new OrderUpdatedEvent(
                command.getOrderID(),
                command.getDateDelivery(),
                command.getStatus()
        ));
    }

    @EventSourcingHandler
    public void on(OrderUpdatedEvent event){
        this.orderID = event.getOrderID();
        this.dateDelivery = event.getDateDelivery();
        this.status = event.getStatus();
    }
}
