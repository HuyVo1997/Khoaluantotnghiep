package com.microservice.orderservice;

import com.microservice.productservice.Repository.UsedCodeRepository;
import com.microservice.productservice.Service.Product.ProductQueryService;
import com.microservice.productservice.Service.UsedDiscount.UsedCodeService;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

@EnableEurekaClient
@SpringBootApplication
public class OrderServiceApplication {

    @Autowired
    private QueryGateway queryGateway;

    @Bean
    ProductQueryService productQueryService(){
        return new ProductQueryService(queryGateway);
    }

    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }

}
