package com.microservice.orderservice.Aggregate;

import com.microservice.orderservice.Commands.Cart.CreateCartCommand;
import com.microservice.orderservice.Commands.Cart.DeleteCartCommand;
import com.microservice.orderservice.Commands.Cart.UpdateQuantityCommand;
import com.microservice.orderservice.Events.Cart.CartCreatedEvent;
import com.microservice.orderservice.Events.Cart.CartDeletedEvent;
import com.microservice.orderservice.Events.Cart.QuantityUpdatedEvent;
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
public class CartAggregate {
    @AggregateIdentifier
    private String cartID;
    private String user;
    private List<Product> products;
    private Integer quantity;

    @CommandHandler
    public CartAggregate(CreateCartCommand command){
        AggregateLifecycle.apply(new CartCreatedEvent(
                command.getCartID(),
                command.getUser(),
                command.getProducts()
        ));
    }


    @EventSourcingHandler
    public void on(CartCreatedEvent event){
        this.cartID = event.getCartID();
        this.user = event.getUser();
        this.products = event.getProducts();
    }


    @CommandHandler
    public void handle(DeleteCartCommand command){
        AggregateLifecycle.apply(new CartDeletedEvent(
                command.getCartID()
        ));
    }

    @EventSourcingHandler
    public void on(CartDeletedEvent event){
        this.cartID = event.getCartID();
    }

    @CommandHandler
    public void handle(UpdateQuantityCommand command){
        AggregateLifecycle.apply(new QuantityUpdatedEvent(
                command.getCartID(),
                command.getQuantity()
        ));
    }

    @EventSourcingHandler
    public void on(QuantityUpdatedEvent event){
        this.cartID = event.getCartID();
        this.quantity = event.getQuantity();
    }
}
