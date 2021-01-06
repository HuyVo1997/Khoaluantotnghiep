package com.microservice.productservice.Controllers.Promotion;

import com.microservice.productservice.DTO.PromotionDTO;
import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Model.ProductPromotion;
import com.microservice.productservice.Model.Promotions;
import com.microservice.productservice.Service.Promotion.PromotionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class PromotionController {

    @Autowired
    private final PromotionService promotionService;

    @PostMapping("/promotion")
    public ResponseEntity<Promotions> createPromotionBill(@RequestBody PromotionDTO promotionDTO){

        Promotions newPromotion = promotionService.save(promotionDTO);

        return new ResponseEntity<Promotions>(newPromotion , HttpStatus.OK);
    }

    @GetMapping("/promotion")
    public List<Promotions> getAllPromotion(){
        return this.promotionService.getAllPromotion();
    }

    @GetMapping("/product-promotion")
    public List<ProductPromotion> getProductPromotionByPromotion(){
        return this.promotionService.getProductByPromotionID();
    }

    @GetMapping("/gift-product/{promotionID}")
    public List<Product> getAllProductInPromotion(@PathVariable("promotionID") String promotionID){
        return this.promotionService.getAllProductInPromotion(promotionID);
    }

    @DeleteMapping("/promotion/{promotionID}")
    public void deletePromotion(@PathVariable ("promotionID") String promotionID){
        this.promotionService.deletePromotion(promotionID);
    }
}
