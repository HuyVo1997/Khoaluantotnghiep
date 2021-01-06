package com.microservice.productservice.Aggregate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.axonframework.spring.stereotype.Aggregate;

@Aggregate
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AccessoriesWatchAggregate {
    //Watch
    private Integer specID;
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
