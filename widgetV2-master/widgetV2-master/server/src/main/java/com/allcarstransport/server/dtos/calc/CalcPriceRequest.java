package com.allcarstransport.server.dtos.calc;

import com.allcarstransport.server.persistance.enums.OpenEnclosedType;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

public class CalcPriceRequest {

    @NotNull
    @NotEmpty
    private List<Car> cars;
    @NotNull
    private String placeFromId;
    @NotNull
    private String placeToId;
    @NotNull
    private OpenEnclosedType openEnclosed;

    public List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }

    public String getPlaceFromId() {
        return placeFromId;
    }

    public void setPlaceFromId(String placeFromId) {
        this.placeFromId = placeFromId;
    }

    public String getPlaceToId() {
        return placeToId;
    }

    public void setPlaceToId(String placeToId) {
        this.placeToId = placeToId;
    }

    public OpenEnclosedType getOpenEnclosed() {
        return openEnclosed;
    }

    public void setOpenEnclosed(OpenEnclosedType openEnclosed) {
        this.openEnclosed = openEnclosed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CalcPriceRequest that = (CalcPriceRequest) o;
        return cars.size() == that.cars.size() &&
                cars.containsAll(that.cars) &&
                that.cars.containsAll(cars) &&
                placeFromId.equals(that.placeFromId) &&
                placeToId.equals(that.placeToId) && openEnclosed == that.openEnclosed;
    }

    @Override
    public int hashCode() {
        return Objects.hash(cars, placeFromId, placeToId, openEnclosed);
    }

    @Override
    public String toString() {
        return "CalcPriceRequest{" +
                "cars=" + cars +
                ", placeFromId='" + placeFromId + '\'' +
                ", placeToId='" + placeToId + '\'' +
                ", openEnclosed=" + openEnclosed +
                '}';
    }

}
