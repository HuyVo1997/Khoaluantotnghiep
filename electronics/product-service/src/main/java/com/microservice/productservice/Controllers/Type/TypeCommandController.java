package com.microservice.productservice.Controllers.Type;

import com.microservice.productservice.Model.TypeProduct;
import com.microservice.productservice.Service.Type.TypeCommandService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class TypeCommandController {
    @Autowired
    private TypeCommandService typeCommandService;

    @PostMapping(value="/types")
    public CompletableFuture<TypeProduct> createType(@RequestParam("type") String type){
        return this.typeCommandService.createType(type);
    }

    @DeleteMapping("/types/{typeID}")
    public TypeProduct deleteCategory(@PathVariable("typeID") String typeID){
        return this.typeCommandService.deleteCategory(typeID);
    }
}
