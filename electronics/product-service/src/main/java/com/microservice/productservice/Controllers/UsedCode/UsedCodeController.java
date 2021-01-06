package com.microservice.productservice.Controllers.UsedCode;

import com.microservice.productservice.Model.UsedCode;
import com.microservice.productservice.Service.UsedDiscount.UsedCodeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UsedCodeController {

    @Autowired
    private final UsedCodeService usedCodeService;

    @GetMapping("/used-code/{email}/{discountID}")
    public UsedCode getUsedCodeByUser(@PathVariable String email,
                                      @PathVariable String discountID){
        return this.usedCodeService.getUsedCodeByUser(email , discountID);
    }

    @GetMapping("/used-code/{orderID}")
    public UsedCode getUsedCodeOfOrder(@PathVariable ("orderID") String orderID){
        return this.usedCodeService.getUsedCodeOfOrder(orderID);
    }
}
