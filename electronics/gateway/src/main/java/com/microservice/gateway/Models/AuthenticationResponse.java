package com.microservice.gateway.Models;

import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class AuthenticationResponse {
    private final String jwt;
}
