package com.microservice.productservice.DTO;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ImageDTO {
    private List<String> url;
}
