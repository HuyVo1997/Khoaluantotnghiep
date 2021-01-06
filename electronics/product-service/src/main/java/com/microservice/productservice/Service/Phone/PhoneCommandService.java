package com.microservice.productservice.Service.Phone;

import com.microservice.productservice.Amazon.AmazonClient;
import com.microservice.productservice.Commands.Laptop.CreateLaptopCommand;
import com.microservice.productservice.Commands.Phone.CreatePhoneCommand;
import com.microservice.productservice.DTO.LaptopDTO;
import com.microservice.productservice.DTO.LaptopData;
import com.microservice.productservice.DTO.PhoneDTO;
import com.microservice.productservice.DTO.ProductDTO;
import com.microservice.productservice.Model.Images;
import com.microservice.productservice.Model.PhoneData;
import com.microservice.productservice.Model.PhoneLaptop;
import lombok.AllArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class PhoneCommandService {

    @Autowired
    private final CommandGateway commandGateway;

    @Autowired
    private AmazonClient amazonClient;


    public CompletableFuture<PhoneLaptop> createSpecification(PhoneData phoneData, MultipartFile[] images){

        PhoneDTO phone = phoneData.getPhoneDTO();
        List<Images> productImages = new ArrayList<>();

        if(images.length > 0){
            for(MultipartFile file : images){
                Images newImage = new Images(null, amazonClient.uploadFile(file));
                productImages.add(newImage);
            }
        }

        ProductDTO product = phoneData.getProductDTO();
        product.setImages(productImages);

        return this.commandGateway.send(new CreatePhoneCommand(
                UUID.randomUUID().toString(),
                phone.getScreen(),
                phone.getOs(),
                phone.getCamera1(),
                phone.getCamera2(),
                phone.getCpu(),
                phone.getRam(),
                phone.getMemory(),
                phone.getSim(),
                phone.getBattery(),
                product
        ));
    }

    public CompletableFuture<PhoneLaptop> createSpecification(LaptopData laptopData, MultipartFile[] images){

        LaptopDTO laptop = laptopData.getLaptopDTO();
        List<Images> productImages = new ArrayList<>();

        if(images.length > 0){
            for(MultipartFile file : images){
                Images newImage = new Images(null, amazonClient.uploadFile(file));
                productImages.add(newImage);
            }
        }

        ProductDTO product = laptopData.getProductDTO();
        product.setImages(productImages);

        return this.commandGateway.send(new CreateLaptopCommand(
                UUID.randomUUID().toString(),
                laptop.getCpu(),
                laptop.getRam(),
                laptop.getHardDrive(),
                laptop.getScreen(),
                laptop.getCardScreen(),
                laptop.getConnector(),
                laptop.getOs(),
                laptop.getMaterial(),
                laptop.getSize(),
                product
        ));
    }

}
