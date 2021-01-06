package com.microservice.productservice.Model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.microservice.productservice.DTO.ImageDTO;
import com.microservice.productservice.DTO.PhoneDTO;
import com.microservice.productservice.DTO.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class PhoneData {
    private PhoneDTO phoneDTO;
    private ProductDTO productDTO;
}
