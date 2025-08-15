package com.allcarstransport.server.controllers;

import com.allcarstransport.server.dtos.order.AddNoteRequest;
import com.allcarstransport.server.dtos.order.CreateOrUpdateOrderRequest;
import com.allcarstransport.server.dtos.CreateResponse;
import com.allcarstransport.server.dtos.PageResponse;
import com.allcarstransport.server.dtos.order.DispatchRequest;
import com.allcarstransport.server.dtos.order.DriverDTO;
import com.allcarstransport.server.dtos.order.OrderPageRequest;
import com.allcarstransport.server.dtos.order.OrderResponse;
import com.allcarstransport.server.security.CurrentUser;
import com.allcarstransport.server.services.OrderService;
import org.bson.types.ObjectId;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@Validated
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public CreateResponse<ObjectId> create(@Valid @RequestBody CreateOrUpdateOrderRequest request) {

        return new CreateResponse<>(orderService.create(request));
    }

    @GetMapping("/{id}")
    public OrderResponse getById(@PathVariable("id") ObjectId id,
                                 @NotNull @AuthenticationPrincipal CurrentUser user) {

        return orderService.getById(id, user);
    }

    @PatchMapping("/{id}")
    public void patch(@PathVariable("id") ObjectId id,
                      @Valid @RequestBody CreateOrUpdateOrderRequest request,
                      @NotNull @AuthenticationPrincipal CurrentUser user) {

        orderService.update(id, request, user);

    }

    @GetMapping
    public PageResponse<OrderResponse> getList(@Valid @ModelAttribute OrderPageRequest request,
                                               @NotNull @AuthenticationPrincipal CurrentUser user) {

        return orderService.getList(request, user);
    }

    @PostMapping("/dispatch/{id}")
    public void dispatch(@Valid @PathVariable("id") ObjectId id,
                         @Valid @RequestBody DispatchRequest request,
                         @NotNull @AuthenticationPrincipal CurrentUser user) {

        orderService.dispatch(id, request, user);

    }

    @PostMapping("/pick_up/{id}")
    public void pickUp(@Valid @PathVariable("id") ObjectId id, @NotNull @AuthenticationPrincipal CurrentUser user) {

        orderService.pickUp(id, user);

    }

    @PostMapping("/pay/{id}")
    public void pay(@Valid @PathVariable("id") ObjectId id, @NotNull @AuthenticationPrincipal CurrentUser user) {

        orderService.pay(id, user);

    }

    @PostMapping("/deliver/{id}")
    public void deliver(@Valid @PathVariable("id") ObjectId id, @NotNull @AuthenticationPrincipal CurrentUser user) {

        orderService.deliver(id, user);

    }

    @PostMapping("/cancel/{id}")
    public void cancel(@Valid @PathVariable("id") ObjectId id, @NotNull @AuthenticationPrincipal CurrentUser user) {

        orderService.cancel(id, user);

    }

    @PostMapping("/new/{id}")
    public void setNewStatus(@Valid @PathVariable("id") ObjectId id, @NotNull @AuthenticationPrincipal CurrentUser user) {

        orderService.setNewStatus(id, user);

    }

    @PostMapping("/note/{id}")
    public void addNote(@Valid @PathVariable("id") ObjectId id, @RequestBody AddNoteRequest request,
                        @NotNull @AuthenticationPrincipal CurrentUser user) {

        orderService.addNote(id, request, user);

    }

    @GetMapping("/drivers")
    public List<DriverDTO> findDrivers(@RequestParam("name") @Length(min = 2) String name) {

        return orderService.findDrivers(name);

    }

}
