package com.allcarstransport.server.services;

import com.allcarstransport.server.persistance.entities.CarModel;

import java.util.List;

public interface CarModelService {

    void update();

    List<String> getYears(Integer part);

    List<String> getMakers(Integer year, String part);

    List<CarModel> getModels(Integer year, String maker, String part);

}
