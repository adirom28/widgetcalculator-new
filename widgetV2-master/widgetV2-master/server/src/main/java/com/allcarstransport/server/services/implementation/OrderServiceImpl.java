package com.allcarstransport.server.services.implementation;

import com.allcarstransport.server.dtos.PageResponse;
import com.allcarstransport.server.dtos.order.AddNoteRequest;
import com.allcarstransport.server.dtos.order.CreateOrUpdateOrderRequest;
import com.allcarstransport.server.dtos.order.DispatchRequest;
import com.allcarstransport.server.dtos.order.DriverDTO;
import com.allcarstransport.server.dtos.order.OrderPageRequest;
import com.allcarstransport.server.dtos.order.OrderResponse;
import com.allcarstransport.server.exception.ServerException;
import com.allcarstransport.server.persistance.entities.CarModel;
import com.allcarstransport.server.persistance.entities.Dispatch;
import com.allcarstransport.server.persistance.entities.Driver;
import com.allcarstransport.server.persistance.entities.Order;
import com.allcarstransport.server.persistance.entities.OrderNote;
import com.allcarstransport.server.persistance.enums.OrderStatus;
import com.allcarstransport.server.persistance.repositories.DispatchRepository;
import com.allcarstransport.server.persistance.repositories.DriverRepository;
import com.allcarstransport.server.persistance.repositories.OrderRepository;
import com.allcarstransport.server.security.CurrentUser;
import com.allcarstransport.server.services.OrderService;
import com.allcarstransport.server.utils.mappers.OrderMapper;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final DriverRepository driverRepository;
    private final DispatchRepository dispatchRepository;
    private final MongoTemplate mongoTemplate;

    public OrderServiceImpl(OrderRepository orderRepository, OrderMapper orderMapper,
                            DispatchRepository dispatchRepository, DriverRepository driverRepository,
                            MongoTemplate mongoTemplate) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.driverRepository = driverRepository;
        this.mongoTemplate = mongoTemplate;
        this.dispatchRepository = dispatchRepository;
    }

    @Override
    public ObjectId create(@NonNull CreateOrUpdateOrderRequest request) {
        Order entity = orderMapper.mapToEntity(request);
        entity.setStatus(OrderStatus.NEW);

        entity = orderRepository.insert(entity);

        return entity.getId();
    }

    @Override
    public OrderResponse getById(@NonNull ObjectId id, @NonNull CurrentUser user) {

        return orderMapper.mapToDTO(geByIdOrThrowException(id, user));

    }

    @Override
    public PageResponse<OrderResponse> getList(@NonNull OrderPageRequest request, @NonNull CurrentUser user) {
        org.springframework.data.domain.PageRequest pageable = org.springframework.data.domain.PageRequest.of(
                request.getPageNumber(),
                request.getPageSize(),
                request.getSortingDirection() == Sort.Direction.ASC ?
                        Sort.by(request.getSortingField()).ascending() :
                        Sort.by(request.getSortingField()).descending()
        );

        Page<Order> page;
        if (request.getStatus() != null) {
            page = orderRepository.findAllByStatus(request.getStatus(), pageable);
        } else {
            page = orderRepository.findAll(pageable);
        }

        return new PageResponse<>(request, page.map(orderMapper::mapToDTO));
    }

    @Override
    public void update(@NonNull ObjectId id, @NonNull CreateOrUpdateOrderRequest request, @NonNull CurrentUser user) {
        Order entity = orderMapper.updateEntity(geByIdOrThrowException(id, user), request);
        orderRepository.save(entity);
    }

    @Override
    public void dispatch(@NonNull ObjectId id, @NonNull DispatchRequest request, @NonNull CurrentUser user) {
        Order order = geByIdOrThrowException(id, user);

        Driver driver = new Driver();
        if (request.getDriverId() != null) {
            Optional<Driver> driverOptional = driverRepository.findById(request.getDriverId());
            if (driverOptional.isPresent()) {
                driver = driverOptional.get();
            }
        }
        driver = orderMapper.updateEntity(driver, request);

        Dispatch dispatch = new Dispatch();
        if (order.getDispatch() != null) {
            dispatch = order.getDispatch();
        }
        dispatch = orderMapper.updateEntity(dispatch, request);

        dispatch.setDriver(driverRepository.save(driver));
        order.setDispatch(dispatchRepository.save(dispatch));
        order.setStatus(OrderStatus.DISPATCHED);

        orderRepository.save(order);
    }

    @Override
    public void pickUp(@NonNull ObjectId id, @NonNull CurrentUser user) {
        Order entity = geByIdOrThrowException(id, user);
        entity.setStatus(OrderStatus.PICKED_UP);

        orderRepository.save(entity);
    }

    @Override
    public void pay(@NonNull ObjectId id, @NonNull CurrentUser user) {
        Order entity = geByIdOrThrowException(id, user);
        entity.setStatus(OrderStatus.PAID);

        orderRepository.save(entity);
    }

    @Override
    public void deliver(@NonNull ObjectId id, @NonNull CurrentUser user) {
        Order entity = geByIdOrThrowException(id, user);
        entity.setStatus(OrderStatus.DELIVERED);

        orderRepository.save(entity);
    }

    @Override
    public void cancel(@NonNull ObjectId id, @NonNull CurrentUser user) {
        Order entity = geByIdOrThrowException(id, user);
        entity.setStatus(OrderStatus.CANCELLED);

        orderRepository.save(entity);
    }

    @Override
    public void setNewStatus(@NonNull ObjectId id, @NonNull CurrentUser user) {
        Order entity = geByIdOrThrowException(id, user);
        entity.setStatus(OrderStatus.NEW);

        orderRepository.save(entity);
    }

    @Override
    public void addNote(@NonNull ObjectId id, @NonNull AddNoteRequest request, @NonNull CurrentUser user) {
        Order entity = geByIdOrThrowException(id, user);

        List<OrderNote> notes = entity.getNotes();
        notes.add(orderMapper.mapToEntity(request));
        entity.setNotes(notes.stream().sorted().collect(Collectors.toList()));

        orderRepository.save(entity);
    }

    @Override
    public List<DriverDTO> findDrivers(@NotBlank String name) {
        Query query = new Query();

        query = query.addCriteria(Criteria.where("nameCarrier").regex("^.*" + name + ".*$"));

        query.with(Sort.by(Sort.Direction.ASC, "nameCarrier"));

        return mongoTemplate.find(query, Driver.class).stream()
                .map(orderMapper::mapToDriverDTO)
                .collect(Collectors.toList());

    }

    private Order geByIdOrThrowException(@NonNull ObjectId id, @NonNull CurrentUser user) {
        Optional<Order> byId = orderRepository.findById(id);

        if (byId.isPresent()) {
//            if (!byId.get().getUserId().equals(user.getId())) {
//                throw new ServerException(
//                        format("Order with id=%s not found!!!", id.toHexString()),
//                        HttpStatus.FORBIDDEN
//                );
//            }
        } else {
            throw new ServerException(
                    format("Order with id=%s not found!!!", id.toHexString()),
                    HttpStatus.BAD_REQUEST
            );
        }

        return byId.get();
    }

}
