package com.microservice.productservice.DTO;

import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Model.Images;
import com.microservice.productservice.Model.TypeProduct;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ProductDTO {
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private TypeProduct typeProduct;
    private Brand brand;
    private List<Images> images;
}
