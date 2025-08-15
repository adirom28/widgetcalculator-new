package com.allcarstransport.server.utils.mappers;

import com.allcarstransport.server.dtos.user.ClientShortInfo;
import com.allcarstransport.server.dtos.user.NotificationConfigDTO;
import com.allcarstransport.server.dtos.user.RegisterUserRequest;
import com.allcarstransport.server.config.Role;
import com.allcarstransport.server.persistance.entities.NotificationConfig;
import com.allcarstransport.server.persistance.entities.User;
import org.bson.types.Binary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserMapper extends BaseMapper {

    @Mapping(target = "password", source = "password")
    User mapToEntity(RegisterUserRequest data, Set<Role> roles, String password);

    ClientShortInfo mapToShortInfo(User user);

    NotificationConfig mapNotificationFromDTO(NotificationConfigDTO configDTO);

    NotificationConfigDTO mapNotificationToDTO(NotificationConfig configDTO);

}
