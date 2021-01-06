package com.microservice.productservice.Projection;

import com.microservice.productservice.Events.Brand.BrandCreatedEvent;
import com.microservice.productservice.Events.Brand.BrandUpdatedEvent;
import com.microservice.productservice.Model.Brand;
import com.microservice.productservice.Query.GetBrandList;
import com.microservice.productservice.Repository.BrandRepository;
import com.microservice.productservice.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class BrandProjection {
    @Autowired
    private final BrandRepository brandRepository;

    @EventHandler
    public void on(BrandCreatedEvent event){
        Brand brand = new Brand(event.getBrandID(), event.getName(), event.getStatus());
        this.brandRepository.save(brand);
    }

    @EventHandler
    public void on(BrandUpdatedEvent event){
        Brand brand = this.brandRepository.findById(event.getBrandID()).orElse(null);
        if(brand != null){
            if(brand.getStatus() == 0){
                brand.setStatus(1);
            }
            else{
                brand.setStatus(0);
            }
        }
        this.brandRepository.save(brand);
    }

    @QueryHandler
    public List<Brand> handle(GetBrandList query){
       return this.brandRepository.findAll();
    }


}
