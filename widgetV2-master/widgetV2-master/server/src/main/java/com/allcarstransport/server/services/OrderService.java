package com.allcarstransport.server.services;

import com.allcarstransport.server.dtos.PageResponse;
import com.allcarstransport.server.dtos.order.AddNoteRequest;
import com.allcarstransport.server.dtos.order.CreateOrUpdateOrderRequest;
import com.allcarstransport.server.dtos.order.DispatchRequest;
import com.allcarstransport.server.dtos.order.DriverDTO;
import com.allcarstransport.server.dtos.order.OrderPageRequest;
import com.allcarstransport.server.dtos.order.OrderResponse;
import com.allcarstransport.server.security.CurrentUser;
import org.bson.types.ObjectId;
import org.springframework.lang.NonNull;

import javax.validation.constraints.NotBlank;
import java.util.List;

public interface OrderService {

    ObjectId create(@NonNull CreateOrUpdateOrderRequest request);

    OrderResponse getById(@NonNull ObjectId id, @NonNull CurrentUser user);

    PageResponse<OrderResponse> getList(@NonNull OrderPageRequest request, @NonNull CurrentUser user);

    void update(@NonNull ObjectId id, @NonNull CreateOrUpdateOrderRequest request, @NonNull CurrentUser user);

    void dispatch(@NonNull ObjectId id, @NonNull DispatchRequest request, @NonNull CurrentUser user);

    void pickUp(@NonNull ObjectId id, @NonNull CurrentUser user);

    void pay(@NonNull ObjectId id, @NonNull CurrentUser user);

    void deliver(@NonNull ObjectId id, @NonNull CurrentUser user);

    void cancel(@NonNull ObjectId id, @NonNull CurrentUser user);

    void setNewStatus(@NonNull ObjectId id, @NonNull CurrentUser user);

    void addNote(@NonNull ObjectId id, @NonNull AddNoteRequest request, @NonNull CurrentUser user);

    List<DriverDTO> findDrivers(@NotBlank String name);

}
