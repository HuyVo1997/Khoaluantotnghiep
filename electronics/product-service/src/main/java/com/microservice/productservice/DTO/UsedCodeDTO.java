package com.microservice.productservice.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UsedCodeDTO {
    private String email;
    private String discountID;
    private String orderID;
}
