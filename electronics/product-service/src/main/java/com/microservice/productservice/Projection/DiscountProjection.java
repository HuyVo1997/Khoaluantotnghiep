package com.microservice.productservice.Projection;

import com.microservice.productservice.Events.Discount.DiscountCreatedEvent;
import com.microservice.productservice.Events.Discount.DiscountUpdatedEvent;
import com.microservice.productservice.Model.ProductDiscount;
import com.microservice.productservice.Model.UsedCode;
import com.microservice.productservice.Query.GetAllDiscount;
import com.microservice.productservice.Repository.DiscountRepository;
import com.microservice.productservice.Repository.UsedCodeRepository;
import lombok.RequiredArgsConstructor;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Component
public class DiscountProjection {
    @Autowired
    private final DiscountRepository discountRepository;

    @Autowired
    private final UsedCodeRepository usedCodeRepository;

    @EventHandler
    public void on(DiscountCreatedEvent event){
        ProductDiscount productDiscount = new ProductDiscount(
                event.getDiscountID(),
                event.getCode(),
                event.getPercent(),
                event.getLimitCode(),
                event.getUsesCode(),
                event.getDateStart(),
                event.getDateEnd(),
                event.getStatus()
        );

        this.discountRepository.save(productDiscount);
    }


    @EventHandler
    public void on(DiscountUpdatedEvent event){
        ProductDiscount productDiscount =
                this.discountRepository.getProductDiscountByDiscountIDAndStatus(
                        event.getDiscountID(),
                        1);
        productDiscount.setUsesCode(productDiscount.getUsesCode() + 1);

        System.out.println(productDiscount);

        this.discountRepository.save(productDiscount);

        if(productDiscount != null){
            UsedCode usedCode = new UsedCode(
                    UUID.randomUUID().toString(),
                    event.getDiscountID(),
                    event.getEmail(),
                    event.getOrderID()
            );

            this.usedCodeRepository.save(usedCode);
        }
    }

    @QueryHandler
    public List<ProductDiscount> getAllDiscount(GetAllDiscount query){
        return this.discountRepository.findAll();
    }
}
