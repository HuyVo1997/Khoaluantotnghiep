package com.microservice.gateway.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    private String userID;
    private String email;
    private String password;
    private String name;
    private String phone;
    private String address;

    public User(String userID, String email, String password){
        this.userID = userID;
        this.email = email;
        this.password = password;
    }

    public User(String userID, String email){
        this.userID = userID;
        this.email = email;
    }
}
