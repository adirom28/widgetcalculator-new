package com.allcarstransport.server.persistance.repositories;

import com.allcarstransport.server.persistance.entities.Dispatch;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DispatchRepository extends MongoRepository<Dispatch, ObjectId> {
}