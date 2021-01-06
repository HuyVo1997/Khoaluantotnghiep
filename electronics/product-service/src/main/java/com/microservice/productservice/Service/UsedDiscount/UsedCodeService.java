package com.microservice.productservice.Service.UsedDiscount;

import com.microservice.productservice.DTO.UsedCodeDTO;
import com.microservice.productservice.Model.UsedCode;
import com.microservice.productservice.Repository.UsedCodeRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UsedCodeService {

    @Autowired
    private final UsedCodeRepository usedCodeRepository;

    public UsedCode addUsedCode(UsedCodeDTO usedCodeDTO){

        UsedCode usedCode = new UsedCode(
                UUID.randomUUID().toString(),
                usedCodeDTO.getEmail(),
                usedCodeDTO.getDiscountID(),
                usedCodeDTO.getOrderID()
        );

        this.usedCodeRepository.save(usedCode);

        return usedCode;
    }

    public UsedCode getUsedCodeByUser(String email, String discountID){
        return this.usedCodeRepository
                .findUsedCodeByEmailAndDiscountID(email
                        , discountID);
    }

    public UsedCode getUsedCodeOfOrder(String orderID){
        return this.usedCodeRepository.findUsedCodeByOrderID(orderID);
    }

}
