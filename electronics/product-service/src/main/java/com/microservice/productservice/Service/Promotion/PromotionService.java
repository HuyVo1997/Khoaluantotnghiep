package com.microservice.productservice.Service.Promotion;

import com.microservice.productservice.DTO.PromotionDTO;
import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Model.ProductPromotion;
import com.microservice.productservice.Model.Promotions;
import com.microservice.productservice.Repository.ProductPromotionRepository;
import com.microservice.productservice.Repository.ProductRepository;
import com.microservice.productservice.Repository.PromotionRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PromotionService {
    @Autowired
    private final PromotionRepository promotionRepository;

    @Autowired
    private final ProductPromotionRepository productPromotionRepository;

    @Autowired
    private final ProductRepository productRepository;

    public Promotions save(PromotionDTO promotions){

        Promotions newPromotion = new Promotions(
                UUID.randomUUID().toString(),
                promotions.getName(),
                promotions.getForPromotion(),
                promotions.getFormPromotion(),
                promotions.getDateStart(),
                promotions.getDateEnd(),
                promotions.getStatus(),
                promotions.getTotalBill(),
                promotions.getPromotionValue()
        );

        if(promotions.getForPromotion() == 0 && promotions.getFormPromotion() == 1){
            if(promotions.getGiftProduct().size() > 0){
                for(int i = 0 ; i < promotions.getGiftProduct().size(); i++){
                    ProductPromotion productPromotion = new ProductPromotion(
                            UUID.randomUUID().toString(),
                            promotions.getGiftProduct().get(i),
                            newPromotion.getPromotionID(),
                            null
                    );
                    this.productPromotionRepository.save(productPromotion);
                }
            }
        }

        if(promotions.getForPromotion() == 1 && promotions.getFormPromotion() == 0){
            if(promotions.getProductID().size() > 0){
                for(int i = 0 ; i < promotions.getProductID().size() ; i++){
                    String productID = promotions.getProductID().get(i);
                    Product product = this.productRepository.findById(productID).get();
                    Double priceSale = (product.getPrice() * promotions.getPromotionValue()) / 100;
                    product.setPrice(product.getPrice() - ((product.getPrice() * promotions.getPromotionValue()) / 100));
                    ProductPromotion productPromotion = new ProductPromotion(
                            UUID.randomUUID().toString(),
                            productID,
                            newPromotion.getPromotionID(),
                            priceSale);
                    this.productPromotionRepository.save(productPromotion);
                    this.productRepository.save(product);
                }
            }
        }

        this.promotionRepository.save(newPromotion);

        return newPromotion;
    }

    public void deletePromotion(String promotionID){
        List<ProductPromotion> productPromotions = this.productPromotionRepository.findProductPromotionByPromotionID(promotionID);
        if(productPromotions.size() > 0){
            this.productPromotionRepository.deleteAll(productPromotions);
        }
        this.promotionRepository.deleteById(promotionID);
    }

    public List<Promotions> getAllPromotion(){
        return this.promotionRepository.findAll();
    }

    public List<ProductPromotion> getProductByPromotionID(){
        return this.productPromotionRepository.findAll();
    }

    public List<Product> getAllProductInPromotion(String promotionID){
        List<ProductPromotion> productPromotions = this.productPromotionRepository.findProductPromotionByPromotionID(promotionID);

        List<Product> products = new ArrayList<>();

        for(ProductPromotion productPromotion : productPromotions){
            Product product = this.productRepository.findById(productPromotion.getProductID()).get();
            products.add(product);
        }

        return products;
    }
}
