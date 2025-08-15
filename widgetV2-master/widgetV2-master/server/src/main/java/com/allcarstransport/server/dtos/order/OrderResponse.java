package com.allcarstransport.server.dtos.order;

import com.allcarstransport.server.persistance.enums.OrderStatus;
import org.bson.types.ObjectId;

public class OrderResponse extends OrderDTO {

    private ObjectId id;
    private OrderStatus status;
    private DispatchDTO driver;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public DispatchDTO getDriver() {
        return driver;
    }

    public void setDriver(DispatchDTO driver) {
        this.driver = driver;
    }

    @Override
    public String toString() {
        return "OrderResponse{" +
                ", email='" + email + '\'' +
                ", date=" + date +
                ", detail='" + detail + '\'' +
                ", price=" + price +
                ", id=" + id +
                '}';
    }

}
