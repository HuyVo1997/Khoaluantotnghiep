package com.microservice.productservice.Projection;

import com.microservice.productservice.Amazon.AmazonClient;
import com.microservice.productservice.Events.Product.ProductCreatedEvent;
import com.microservice.productservice.Events.Product.ProductDeletedEvent;
import com.microservice.productservice.Events.Product.ProductUpdatedEvent;
import com.microservice.productservice.Events.Product.QuantityUpdatedEvent;
import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Model.Images;
import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Query.FindProductQuery;
import com.microservice.productservice.Query.GetProductList;
import com.microservice.productservice.Query.GetProductListByType;
import com.microservice.productservice.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RequiredArgsConstructor
@Component
public class ProductProjection {
    @Autowired
    private final ProductRepository productRepository;

    @EventHandler
    public void on(ProductCreatedEvent event){

        Product product = new Product(
                event.getProductID(),
                event.getName(),
                event.getDescription(),
                event.getPrice(),
                event.getQuantity(),
                event.getTypeProduct(),
                event.getBrand(),
                event.getPhoneLaptop(),
                event.getImages());

        this.productRepository.save(product);
    }

    @EventHandler
    public void on(ProductUpdatedEvent event){
        Optional<Product> productOptional = this.productRepository.findById(event.getProductID());
        if(productOptional.isPresent()){
            Product product = productOptional.get();
            product.setName(event.getName());
            product.setDescription(event.getDescription());
            product.setPrice(event.getPrice());
            product.setQuantity(event.getQuantity());
            product.setBrand(event.getBrand());
            product.setTypeProduct(event.getTypeProduct());
            this.productRepository.save(product);
        }
    }

    @EventHandler
    public void on(ProductDeletedEvent event){
        this.productRepository.deleteById(event.getProductID());
    }

    @EventHandler
    public void on(QuantityUpdatedEvent event){
        Product product = this.productRepository.findById(event.getProductID()).get();
        if(product != null){
            if(product.getQuantity() - event.getQuantity() >= 0){
                product.setQuantity(product.getQuantity() - event.getQuantity());
            }
        }
        this.productRepository.save(product);
    }

    @QueryHandler
    public Product handle(FindProductQuery query){
        return this.productRepository.findById(query.getProductID()).orElse(null);
    }

    @QueryHandler
    public List<Product> handle(GetProductList query){
        return this.productRepository.findAll();
    }

    @QueryHandler
    public List<Product> handle(GetProductListByType query){
        return this.productRepository.getProductsByBrand_NameAndTypeProduct_Type(
                query.getName(),
                query.getType());
    }
}
