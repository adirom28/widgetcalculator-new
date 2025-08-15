package com.allcarstransport.server.services;

import com.allcarstransport.server.dtos.calc.DistanceDTO;
import com.allcarstransport.server.dtos.places.PlaceDTO;
import java.util.List;
import java.util.Set;

public interface PlaceService {

    DistanceDTO getDistance(String placeFromId, String placeToId);

    Set<String> findStates(String part);

    List<PlaceDTO> getCities(String part);

    List<String> getPostalCodes(String placeFromId, String placeToId);

}
