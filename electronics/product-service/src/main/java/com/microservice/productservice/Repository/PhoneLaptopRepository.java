package com.microservice.productservice.Repository;

import com.microservice.productservice.Model.PhoneLaptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PhoneLaptopRepository extends JpaRepository<PhoneLaptop, String> {
}
