package com.microservice.orderservice.Projection;

import com.microservice.orderservice.Events.Order.OrderCreatedEvent;
import com.microservice.orderservice.Events.Order.OrderDeletedEvent;
import com.microservice.orderservice.Events.Order.OrderUpdatedEvent;
import com.microservice.orderservice.Models.Cart;
import com.microservice.orderservice.Models.Order;
import com.microservice.orderservice.Models.OrderDetails;
import com.microservice.orderservice.Query.Order.FindOrderByUser;
import com.microservice.orderservice.Repository.CartRepository;
import com.microservice.orderservice.Repository.OrderDetailsRepository;
import com.microservice.orderservice.Repository.OrderRepository;
import com.microservice.productservice.Commands.Discount.UpdateDiscountCommand;
import com.microservice.productservice.Commands.Product.UpdateQuantityCommand;
import com.microservice.productservice.Model.Product;
import lombok.RequiredArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Component
public class OrderProjection {

    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private final CartRepository cartRepository;

    @Autowired
    private final CommandGateway commandGateway;

    @EventHandler
    public void handle(OrderCreatedEvent event){
        Order order = new Order(
                event.getOrderID(),
                event.getAddress(),
                event.getCity(),
                event.getEmail(),
                event.getName(),
                event.getPayment(),
                event.getPhone(),
                event.getState(),
                event.getStatus(),
                event.getTotal(),
                event.getZip(),
                event.getDateCreate(),
                event.getPercent(),
                null
        );

        this.orderRepository.save(order);

        List<Product> productList = event.getProducts();

        if(productList.size() > 0){
            for(int i = 0 ; i < productList.size() ; i++){
                OrderDetails orderDetails = new OrderDetails(
                        UUID.randomUUID().toString(),
                        productList.get(i).getProductID(),
                        event.getOrderID(),
                        productList.get(i).getQuantity(),
                        productList.get(i).getPrice()
                );
                this.orderDetailsRepository.save(orderDetails);

                Cart cart = this.cartRepository
                        .findCartByProductIDAndUser(productList.get(i).getProductID(), event.getEmail());

                if(cart != null){
                    this.cartRepository.delete(cart);
                }

                this.commandGateway.send(new UpdateQuantityCommand(
                        productList.get(i).getProductID(),
                        productList.get(i).getQuantity()
                ));
            }

            if(event.getDiscountID() != null){
                this.commandGateway.send(new UpdateDiscountCommand(
                        event.getDiscountID(),
                        event.getEmail(),
                        order.getOrderID()
                ));
            }
        }
    }

    @EventHandler
    public void on(OrderUpdatedEvent event){
        if(event.getOrderID() != null){
            Order order = this.orderRepository.findById(event.getOrderID()).get();
            order.setDateDelivery(event.getDateDelivery());
            order.setStatus(event.getStatus());
            this.orderRepository.save(order);
        }
    }

    @EventHandler
    public void handle(OrderDeletedEvent event){

        List<OrderDetails> orderDetails = this.orderDetailsRepository
                .findOrderDetailsByOrderID(event.getOrderID());

        if(orderDetails.size() > 0){
            for(int i = 0 ; i < orderDetails.size() ; i++){
                this.orderDetailsRepository.deleteAll(orderDetails);
            }
        }

        Order order = this.orderRepository.findById(event.getOrderID()).get();

        if(order != null){
            this.orderRepository.delete(order);
        }
    }

    @QueryHandler
    public List<Order> handle(FindOrderByUser query){

        if(query.getUser() != null){
            List<Order> orders = this.orderRepository.findOrdersByEmail(query.getUser());

            List<Order> listOrder = new ArrayList<>();

            if(orders.size() > 0){
                for (Order order : orders) {
                    listOrder.add(order);
                }
            }
            return listOrder;
        }

        else {
            List<Order> orders = this.orderRepository.findAll();
            return  orders;
        }
    }
}
