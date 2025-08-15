package com.allcarstransport.server.persistance.repositories;

import com.allcarstransport.server.persistance.entities.MinPriceConfig;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MinPriceRepository extends MongoRepository<MinPriceConfig, Long> {
}
