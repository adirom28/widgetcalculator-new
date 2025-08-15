package com.allcarstransport.server.dtos.order;

import com.allcarstransport.server.dtos.PageRequest;
import com.allcarstransport.server.persistance.enums.OrderStatus;

public class OrderPageRequest extends PageRequest {

    private OrderStatus status;

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

}
