package com.microservice.orderservice.Commands.Order;

import com.microservice.productservice.Model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderCommand {
    @TargetAggregateIdentifier
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
    private Integer percent;
    private List<Product> products;
}
