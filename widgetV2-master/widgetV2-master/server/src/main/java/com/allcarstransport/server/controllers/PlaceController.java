package com.allcarstransport.server.controllers;

import com.allcarstransport.server.dtos.places.PlaceDTO;
import com.allcarstransport.server.services.PlaceService;
import com.google.maps.model.AutocompletePrediction;
import com.google.maps.model.FindPlaceFromText;
import com.google.maps.model.PlaceDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/places")
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping("/states")
    public Set<String> getStates(@RequestParam(value = "part", required = false) String part) {
        return placeService.findStates(part);
    }

    @GetMapping("/cities")
    public List<PlaceDTO> getCities(@RequestParam(value = "part", required = false) String part) {
        return placeService.getCities(part);
    }

    @GetMapping("/postal-codes")
    public List<String> getPostalCodes(@RequestParam String placeFromId,
                                       @RequestParam String placeToId) {
        return placeService.getPostalCodes(placeFromId, placeToId);
    }

}