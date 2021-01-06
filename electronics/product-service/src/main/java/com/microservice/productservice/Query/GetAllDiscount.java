package com.microservice.productservice.Query;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAllDiscount {
    private String discountID;
    private String code;
    private Integer percent;
    private Integer limitCode;
    private Integer usesCode;
    private String dateStart;
    private String dateEnd;
    private Integer status;
}
