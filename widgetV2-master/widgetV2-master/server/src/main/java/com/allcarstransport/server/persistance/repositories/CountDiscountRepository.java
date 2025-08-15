package com.allcarstransport.server.persistance.repositories;

import com.allcarstransport.server.persistance.entities.CountDiscount;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;

public interface CountDiscountRepository extends MongoRepository<CountDiscount, ObjectId> {

    CountDiscount findFirstByCountLessThanOrderByCountDesc(@NonNull Integer count);

}
