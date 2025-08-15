package com.allcarstransport.server.persistance.repositories;

import com.allcarstransport.server.persistance.entities.Driver;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DriverRepository extends MongoRepository<Driver, ObjectId> {
}
