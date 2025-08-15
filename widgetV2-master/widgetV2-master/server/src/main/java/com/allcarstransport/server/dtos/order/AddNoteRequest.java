package com.allcarstransport.server.dtos.order;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

public class AddNoteRequest {

    @NotBlank
    @Max(20)
    private String name;
    @Max(256)
    @NotBlank
    private String note;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

}
