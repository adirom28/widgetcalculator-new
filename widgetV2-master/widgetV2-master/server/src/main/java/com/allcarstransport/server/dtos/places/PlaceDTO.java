package com.allcarstransport.server.dtos.places;

public class PlaceDTO {

    private final String placeId;
    private final String title;
    private final String city;
    private final String state;

    public PlaceDTO(String placeId, String title, String city, String state) {
        this.placeId = placeId;
        this.title = title;
        this.city = city;
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getPlaceId() {
        return placeId;
    }

    public String getTitle() {
        return title;
    }

}
