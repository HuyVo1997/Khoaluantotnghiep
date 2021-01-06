package com.microservice.productservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "accessories_watch")
public class AccessoriesWatch {
    @Id
    private Integer specID;

    //Watch
    private String screen;
    private String screenSize;
    private String usedTime;
    private String os;
    private String connectOS;
    private String material;
    private String diameter;
    private String wifi;
    private String language;
    private String healthMonitoring;

    //Asscessories
    //Headphone
    private String compatible;
    private String chargePort;
    private String control;

    //USB
    private String memoryStorage;
    private String readSpeed;
    private String madeIn;
}
