package com.microservice.productservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "used_discount")
public class UsedCode {
    @Id
    private String id;
    private String discountID;
    private String email;
    private String orderID;
}
