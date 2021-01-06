package com.microservice.productservice.Aggregate;

import com.microservice.productservice.Commands.Product.CreateProductCommand;
import com.microservice.productservice.Commands.Product.DeleteProductCommand;
import com.microservice.productservice.Commands.Product.UpdateProductCommand;
import com.microservice.productservice.Commands.Product.UpdateQuantityCommand;
import com.microservice.productservice.Events.Product.ProductCreatedEvent;
import com.microservice.productservice.Events.Product.ProductDeletedEvent;
import com.microservice.productservice.Events.Product.ProductUpdatedEvent;
import com.microservice.productservice.Events.Product.QuantityUpdatedEvent;
import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Model.Images;
import com.microservice.productservice.Model.PhoneLaptop;
import com.microservice.productservice.Model.TypeProduct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Aggregate
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ProductAggregate {
    @AggregateIdentifier
    private String productID;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private TypeProduct typeProduct;
    private Brand brand;
    private PhoneLaptop phoneLaptop;
    private List<Images> images;

    @CommandHandler
    public ProductAggregate(CreateProductCommand command){
        AggregateLifecycle.apply(new ProductCreatedEvent(
                command.getProductID(),
                command.getName(),
                command.getDescription(),
                command.getPrice(),
                command.getQuantity(),
                command.getTypeProduct(),
                command.getBrand(),
                command.getPhoneLaptop(),
                command.getImages()
        ));
    }

    @EventSourcingHandler
    public void on(ProductCreatedEvent event){
        this.productID = event.getProductID();
        this.name = event.getName();
        this.price = event.getPrice();
        this.description = event.getDescription();
        this.brand = event.getBrand();
        this.typeProduct = event.getTypeProduct();
        this.quantity = event.getQuantity();
        this.phoneLaptop = event.getPhoneLaptop();
        this.images = event.getImages();
    }

    @CommandHandler
    public void handle(DeleteProductCommand command){
        AggregateLifecycle.apply(new ProductDeletedEvent(
                command.getProductID()
        ));
    }

    @EventSourcingHandler
    public void on(ProductDeletedEvent event){
        this.productID = event.getProductID();
    }

    @CommandHandler
    public void handle(UpdateProductCommand command){
        AggregateLifecycle.apply(new ProductUpdatedEvent(
                command.getProductID(),
                command.getName(),
                command.getDescription(),
                command.getPrice(),
                command.getQuantity(),
                command.getTypeProduct(),
                command.getBrand()
        ));
    }

    @EventSourcingHandler
    public void on(ProductUpdatedEvent event){
        this.name = event.getName();
        this.description = event.getDescription();
        this.price = event.getPrice();
        this.quantity = event.getQuantity();
        this.typeProduct = event.getTypeProduct();
        this.brand = event.getBrand();
    }

    @CommandHandler
    public void handle(UpdateQuantityCommand command){
        AggregateLifecycle.apply(new QuantityUpdatedEvent(
                command.getProductID(),
                command.getQuantity()
        ));
    }

    @EventSourcingHandler
    public void on(QuantityUpdatedEvent event){
        this.productID = event.getProductID();
        this.quantity = event.getQuantity();
    }
}
