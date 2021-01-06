package com.microservice.orderservice.Services.OrderDetails;
import com.microservice.orderservice.Models.CartProduct;
import com.microservice.orderservice.Models.Order;
import com.microservice.orderservice.Models.OrderDetails;
import com.microservice.orderservice.Repository.OrderDetailsRepository;
import com.microservice.orderservice.Repository.OrderRepository;
import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Service.Product.ProductQueryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class OrderDetailsService {

    @Autowired
    private final OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private final ProductQueryService productQueryService;

    @Autowired
    private final OrderRepository orderRepository;

    public List<CartProduct> getProductInOrderDetails(String orderID){
        List<CartProduct> cartProducts = new ArrayList<>();

        List<OrderDetails> orderDetails = this.orderDetailsRepository.findOrderDetailsByOrderID(orderID);

        if(orderDetails.size() > 0){
            for (OrderDetails orderDetail : orderDetails){
                Product product = this.productQueryService.getProductByID(orderDetail.getProductID()).join();
                if(product != null){
                    CartProduct cartProduct =
                            new CartProduct(UUID.randomUUID().toString(),
                                    orderDetail.getProductID(),
                                    product.getName(),
                                    orderDetail.getQuantity(),
                                    orderDetail.getPrice(),
                                    product.getImages());
                    cartProducts.add(cartProduct);
                }
            }

        }

        return cartProducts;
    }

    public List<CartProduct> getAllProductByOrderDetails(){
        List <OrderDetails> allOrderDetails = this.orderDetailsRepository.findAll();
        List<CartProduct> cartProducts = new ArrayList<>();

        if(allOrderDetails.size() > 0){
            for (OrderDetails orderDetail : allOrderDetails){
                Product product = this.productQueryService.getProductByID(orderDetail.getProductID()).join();
                Order order = this.orderRepository.findById(orderDetail.getOrderID()).get();
                if(order.getDateDelivery() != null){

                    Integer monthCurrent = Integer.parseInt(order.getDateCreate().substring(5,7));
                    Integer yearCurrent =  Integer.parseInt(order.getDateCreate().substring(0,4));

                    if(product != null &&
                            (monthCurrent == (Calendar.getInstance().get(Calendar.MONTH)) + 1) &&
                            (yearCurrent == Calendar.getInstance().get(Calendar.YEAR)) &&
                            order.getStatus() == 1){
                        CartProduct cartProduct =
                                new CartProduct(UUID.randomUUID().toString(),
                                        orderDetail.getProductID(),
                                        product.getName(),
                                        orderDetail.getQuantity(),
                                        orderDetail.getPrice(),
                                        product.getImages());
                        cartProducts.add(cartProduct);
                    }
                }
            }
        }
        return cartProducts;
    }
}
