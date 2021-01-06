package com.microservice.productservice.Controllers.Laptop;

import com.microservice.productservice.DTO.LaptopData;
import com.microservice.productservice.Model.PhoneLaptop;
import com.microservice.productservice.Service.Phone.PhoneCommandService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.CompletableFuture;


@RestController
@AllArgsConstructor
public class LaptopCommandController {

    @Autowired
    private final PhoneCommandService phoneCommandService;

    @PostMapping("/laptops")
    public CompletableFuture<PhoneLaptop>
    createSpecification(@RequestPart("laptopData") LaptopData laptopData,
                        @RequestPart("images") MultipartFile[] images){
        return this.phoneCommandService.createSpecification(laptopData, images);
    }
}
