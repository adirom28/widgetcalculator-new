package com.allcarstransport.server.dtos.order;

import com.allcarstransport.server.persistance.enums.OrderStatus;

public class OrderFilter {

    private OrderStatus status;

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "OrderFilter{" +
                "status=" + status +
                '}';
    }

}
