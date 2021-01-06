package com.microservice.productservice.Controllers.Phone;

import com.microservice.productservice.Amazon.AmazonClient;
import com.microservice.productservice.DTO.LaptopData;
import com.microservice.productservice.DTO.ProductDTO;
import com.microservice.productservice.Model.PhoneLaptop;
import com.microservice.productservice.Model.PhoneData;
import com.microservice.productservice.Service.Phone.PhoneCommandService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class PhoneCommandController {

    private final PhoneCommandService phoneCommandService;

    @PostMapping("/phones")
    public CompletableFuture<PhoneLaptop>
    createSpecification(@RequestPart("phoneData") PhoneData phoneData,
                        @RequestPart("images") MultipartFile[] images){
        return this.phoneCommandService.createSpecification(phoneData, images);
    }
}
