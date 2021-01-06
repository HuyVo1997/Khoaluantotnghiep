package com.microservice.productservice.Repository;

import com.microservice.productservice.Model.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ColorRepository extends JpaRepository<Color, String> {
}
