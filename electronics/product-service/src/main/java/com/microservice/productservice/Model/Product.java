package com.microservice.productservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    private String productID;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "typeID")
    private TypeProduct typeProduct;

    @ManyToOne
    @JoinColumn(name = "brandID")
    private Brand brand;

    @OneToOne
    @JoinColumn(name = "specID")
    private PhoneLaptop phoneLaptop;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "productID")
    private List<Images> images;
}