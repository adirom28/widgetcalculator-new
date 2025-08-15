package com.allcarstransport.server.utils.mappers;

import com.allcarstransport.server.dtos.order.AddNoteRequest;
import com.allcarstransport.server.dtos.order.CreateOrUpdateOrderRequest;
import com.allcarstransport.server.dtos.order.DispatchDTO;
import com.allcarstransport.server.dtos.order.DispatchRequest;
import com.allcarstransport.server.dtos.order.DriverDTO;
import com.allcarstransport.server.dtos.order.NoteDTO;
import com.allcarstransport.server.dtos.order.OrderResponse;
import com.allcarstransport.server.persistance.entities.Dispatch;
import com.allcarstransport.server.persistance.entities.Driver;
import com.allcarstransport.server.persistance.entities.Order;
import com.allcarstransport.server.persistance.entities.OrderNote;
import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper extends BaseMapper {

    Order mapToEntity(CreateOrUpdateOrderRequest source);

    Order updateEntity(@MappingTarget Order entity, CreateOrUpdateOrderRequest data);

    Driver updateEntity(@MappingTarget Driver entity, DispatchRequest data);

    Dispatch updateEntity(@MappingTarget Dispatch entity, DispatchRequest data);

    @Mapping(source = "driver.nameCarrier", target = "nameCarrier")
    @Mapping(source = "driver.contactPerson", target = "contactPerson")
    @Mapping(source = "driver.contactEmail", target = "contactEmail")
    @Mapping(source = "driver.contactPhoneNumber", target = "contactPhoneNumber")
    @Mapping(target = "id", ignore = true)
    DispatchDTO mapToDTO(Dispatch dispatch);

    @Mapping(source = "dispatch", target = "driver")
    OrderResponse mapToDTO(Order entity);

    DriverDTO mapToDriverDTO(Driver entity);

    DispatchDTO mapToDispatchDTO(Driver entity);

    OrderNote mapToEntity(AddNoteRequest request);

    OrderNote mapToDTO(NoteDTO dto);

}
