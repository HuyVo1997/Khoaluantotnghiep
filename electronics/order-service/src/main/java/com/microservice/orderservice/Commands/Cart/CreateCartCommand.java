package com.microservice.orderservice.Commands.Cart;

import com.microservice.productservice.Model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateCartCommand {
    @TargetAggregateIdentifier
    private String cartID;
    private String user;
    private List<Product> products;
}
