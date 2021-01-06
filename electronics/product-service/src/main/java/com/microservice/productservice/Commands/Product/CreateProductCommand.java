package com.microservice.productservice.Commands.Product;

import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Model.Images;
import com.microservice.productservice.Model.PhoneLaptop;
import com.microservice.productservice.Model.TypeProduct;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductCommand {
    @TargetAggregateIdentifier
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
