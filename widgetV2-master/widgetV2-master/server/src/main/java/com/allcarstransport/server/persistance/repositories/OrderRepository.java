package com.allcarstransport.server.persistance.repositories;

import com.allcarstransport.server.persistance.entities.Order;
import com.allcarstransport.server.persistance.enums.OrderStatus;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;

public interface OrderRepository extends MongoRepository<Order, ObjectId> {

    @NonNull Page<Order> findAll(@NonNull Pageable pageable);

    @NonNull Page<Order> findAllByUserId(@NonNull ObjectId userId, @NonNull Pageable pageable);

    @NonNull Page<Order> findAllByStatusAndUserId(@NonNull OrderStatus orderStatus, @NonNull ObjectId userId,
                                                  @NonNull Pageable pageable);

    @NonNull Page<Order> findAllByStatus(@NonNull OrderStatus orderStatus, @NonNull Pageable pageable);

}
