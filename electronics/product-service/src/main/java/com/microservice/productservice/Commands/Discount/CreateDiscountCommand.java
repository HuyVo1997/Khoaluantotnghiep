package com.microservice.productservice.Commands.Discount;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateDiscountCommand {
    @TargetAggregateIdentifier
    private String discountID;
    private String code;
    private Integer percent;
    private Integer limitCode;
    private Integer usesCode;
    private String dateStart;
    private String dateEnd;
    private Integer status;
}
