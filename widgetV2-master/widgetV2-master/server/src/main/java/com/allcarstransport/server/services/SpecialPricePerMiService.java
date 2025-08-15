package com.allcarstransport.server.services;

import com.allcarstransport.server.dtos.calc.UpdateSpecialPriceRequest;
import com.allcarstransport.server.persistance.entities.CarModel;
import org.bson.types.ObjectId;

import java.util.List;

public interface SpecialPricePerMiService {

    List<CarModel> getList();

    void delete(ObjectId id);

    void update(List<UpdateSpecialPriceRequest> listRequests);

}
