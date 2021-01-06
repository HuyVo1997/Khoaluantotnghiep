package com.microservice.productservice.Events.Product;

import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Model.Images;
import com.microservice.productservice.Model.PhoneLaptop;
import com.microservice.productservice.Model.TypeProduct;
import lombok.Value;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Value
public class ProductCreatedEvent {
    private String productID;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private TypeProduct typeProduct;
    private Brand brand;
    private PhoneLaptop phoneLaptop;
    private List<Images> images;
}
