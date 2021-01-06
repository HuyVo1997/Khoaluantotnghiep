package com.microservice.gateway.Models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FaceBookLoginRequest {
    private String userID;
    private String name;
    private String email;
}
