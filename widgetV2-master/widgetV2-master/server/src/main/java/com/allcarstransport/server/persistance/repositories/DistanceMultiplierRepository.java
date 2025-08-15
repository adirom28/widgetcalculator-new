package com.allcarstransport.server.persistance.repositories;

import com.allcarstransport.server.persistance.entities.DistanceMultiplier;
import com.allcarstransport.server.persistance.enums.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DistanceMultiplierRepository extends MongoRepository<DistanceMultiplier, Category> {
}
