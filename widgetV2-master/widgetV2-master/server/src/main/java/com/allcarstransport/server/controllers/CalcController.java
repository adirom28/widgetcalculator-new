package com.allcarstransport.server.controllers;

import com.allcarstransport.server.dtos.calc.CalcConfigDTO;
import com.allcarstransport.server.dtos.calc.CalcPriceRequest;
import com.allcarstransport.server.dtos.calc.DistanceDTO;
import com.allcarstransport.server.dtos.calc.PriceDTO;
import com.allcarstransport.server.services.CalcService;
import com.allcarstransport.server.services.PlaceService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/calc")
public class CalcController {

    private final CalcService calcService;
    private final PlaceService placeService;

    public CalcController(CalcService calcService, PlaceService placeService) {
        this.calcService = calcService;
        this.placeService = placeService;
    }

    @GetMapping("/distance")
    public DistanceDTO getDistance(@RequestParam("placeFromId") String placeFromId,
                                   @RequestParam("placeToId") String placeToId) {
        return placeService.getDistance(placeFromId, placeToId);
    }

    @GetMapping("/config")
    public CalcConfigDTO getConfig() {
        return calcService.getConfig();
    }

    @PostMapping("/config")
    public void saveConfig(@Valid @RequestBody CalcConfigDTO config) {
         calcService.saveConfig(config);
    }

    @PostMapping("/price")
    public PriceDTO calcPrice(@Valid @RequestBody CalcPriceRequest request) {
        return calcService.calcPrice(request);
    }

}
