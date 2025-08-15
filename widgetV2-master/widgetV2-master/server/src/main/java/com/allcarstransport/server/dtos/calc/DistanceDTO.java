package com.allcarstransport.server.dtos.calc;

public class DistanceDTO {

    private String distanceText;
    private Double distance;
    private String durationText;

    public DistanceDTO() { }

    public DistanceDTO(String distanceText, Double distance, String duration) {
        this.distanceText = distanceText;
        this.distance = distance;
        this.durationText = duration;
    }

    public String getDistanceText() {
        return distanceText;
    }

    public void setDistanceText(String distanceText) {
        this.distanceText = distanceText;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public String getDurationText() {
        return durationText;
    }

    public void setDurationText(String durationText) {
        this.durationText = durationText;
    }

}
