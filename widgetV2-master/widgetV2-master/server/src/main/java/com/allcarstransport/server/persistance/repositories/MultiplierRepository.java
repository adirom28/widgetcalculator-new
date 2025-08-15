package com.allcarstransport.server.persistance.repositories;

import com.allcarstransport.server.persistance.entities.Multiplier;
import com.allcarstransport.server.persistance.enums.MultiplierType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MultiplierRepository extends MongoRepository<Multiplier, MultiplierType> {
}
