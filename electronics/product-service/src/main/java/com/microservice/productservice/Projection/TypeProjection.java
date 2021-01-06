package com.microservice.productservice.Projection;


import com.microservice.productservice.Events.Type.TypeCreatedEvent;
import com.microservice.productservice.Model.TypeProduct;
import com.microservice.productservice.Query.GetCategoryList;
import com.microservice.productservice.Repository.TypeRepository;
import lombok.RequiredArgsConstructor;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class TypeProjection {
    @Autowired
    private final TypeRepository typeRepository;

    @EventHandler
    public void on(TypeCreatedEvent event){
        TypeProduct type = new TypeProduct(
                event.getTypeID(),
                event.getType()
        );

        this.typeRepository.save(type);
    }

    @QueryHandler
    public List<TypeProduct> handle(GetCategoryList query){
        return this.typeRepository.findAll();
    }
}
