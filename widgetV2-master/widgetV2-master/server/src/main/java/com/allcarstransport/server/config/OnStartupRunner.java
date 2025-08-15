package com.allcarstransport.server.config;

import com.allcarstransport.server.services.CalcService;
import com.allcarstransport.server.services.CarModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OnStartupRunner implements CommandLineRunner {

    private CalcService calcService;
    private CarModelService carModelService;

    @Autowired
    public void setCarModelService(CarModelService carModelService) {
        this.carModelService = carModelService;
    }

    @Autowired
    public void setCalcService(CalcService calcService) {
        this.calcService = calcService;
    }

    @Override
    public void run(String... args) {
        carModelService.update();
        calcService.initMultipliers();
    }

}

