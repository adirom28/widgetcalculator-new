package com.allcarstransport.server.dtos.calc;

import com.allcarstransport.server.persistance.enums.RunningType;
import org.bson.types.ObjectId;

import javax.validation.constraints.NotNull;
import java.util.Objects;

public class Car {

    @NotNull
    private ObjectId modelId;
    @NotNull
    private RunningType runningType;

    public ObjectId getModelId() {
        return modelId;
    }

    public void setModelId(ObjectId modelId) {
        this.modelId = modelId;
    }

    public RunningType getRunningType() {
        return runningType;
    }

    public void setRunningType(RunningType runningType) {
        this.runningType = runningType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Car)) return false;
        Car carDTO = (Car) o;
        return getModelId().equals(carDTO.getModelId()) && getRunningType() == carDTO.getRunningType();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getModelId(), getRunningType());
    }

    @Override
    public String toString() {
        return "CarDTO{" +
                "modelId=" + modelId +
                ", runningType=" + runningType +
                '}';
    }

}
