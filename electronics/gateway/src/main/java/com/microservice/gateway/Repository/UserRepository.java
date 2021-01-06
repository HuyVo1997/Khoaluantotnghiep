package com.microservice.gateway.Repository;

import com.microservice.gateway.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    User findUserByEmail(String email);
}
