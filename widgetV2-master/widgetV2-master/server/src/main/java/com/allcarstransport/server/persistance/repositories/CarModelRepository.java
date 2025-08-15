package com.allcarstransport.server.persistance.repositories;

import com.allcarstransport.server.persistance.entities.CarModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CarModelRepository extends MongoRepository<CarModel, ObjectId> {

     List<CarModel> findAllBySpecialPricePerMiIsNotNull();

}
