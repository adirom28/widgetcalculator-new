package com.allcarstransport.server.controllers;

import com.allcarstransport.server.dtos.calc.UpdateSpecialPriceRequest;
import com.allcarstransport.server.services.SpecialPricePerMiService;
import com.allcarstransport.server.persistance.entities.CarModel;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/specialPrice")
public class SpecialPricePerMiController {

    private final SpecialPricePerMiService service;

    public SpecialPricePerMiController(SpecialPricePerMiService service) {
        this.service = service;
    }

    @GetMapping("/list")
    public List<CarModel> getList() {
        return service.getList();
    }

    @PostMapping("/delete")
    public void remove(@RequestBody List<ObjectId> ids) {
        for (ObjectId id : ids) {
            service.delete(id);
        }
    }

    @PostMapping("/update")
    public void update(@RequestBody List<UpdateSpecialPriceRequest> listRequests) {
        service.update(listRequests);
    }

}
