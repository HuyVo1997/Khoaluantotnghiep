package com.microservice.productservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "phone_laptop")
public class PhoneLaptop {
    @Id
    private String specID;
    private String screen;
    private String os;
    private String camera1;
    private String camera2;
    private String cpu;
    private String ram;
    private String memory;
    private String sim;
    private String battery;
    private String hardDrive;
    private String cardScreen;
    private String connector;
    private String material;
    private String size;

    public PhoneLaptop(String specID, String screen, String os, String camera1, String camera2, String cpu,
                       String ram, String memory, String sim, String battery){
        this.specID = specID;
        this.screen = screen;
        this.os = os;
        this.camera1 = camera1;
        this.camera2 = camera2;
        this.cpu = cpu;
        this.ram = ram;
        this.memory = memory;
        this.sim = sim;
        this.battery = battery;
    }

    public PhoneLaptop(String specID, String cpu, String ram, String hardDrive, String screen,
                       String cardScreen, String connector, String os, String material, String size, String laptop){
        this.specID = specID;
        this.cpu = cpu;
        this.ram = ram;
        this.hardDrive = hardDrive;
        this.screen = screen;
        this.cardScreen = cardScreen;
        this.connector = connector;
        this.os = os;
        this.material = material;
        this.size = size;
    }
}
