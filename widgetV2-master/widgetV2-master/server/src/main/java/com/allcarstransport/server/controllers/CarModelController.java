package com.allcarstransport.server.controllers;

import com.allcarstransport.server.services.CarModelService;
import com.allcarstransport.server.persistance.entities.CarModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarModelController {

    private final CarModelService service;

    public CarModelController(CarModelService service) {
        this.service = service;
    }

    @GetMapping("/years")
    public List<String> getYears(@RequestParam(required = false) Integer part) {
        return service.getYears(part);
    }

    @GetMapping("/makers")
    public List<String> getMakers(@RequestParam Integer year,
                                  @RequestParam(required = false) String part) {
        return service.getMakers(year, part);
    }

    @GetMapping("/models")
    public List<CarModel> getModels(@RequestParam Integer year,
                                    @RequestParam String maker,
                                    @RequestParam(required = false) String part) {
        return service.getModels(year, maker, part);
    }

}
