package com.allcarstransport.server.persistance.entities;

import org.jetbrains.annotations.NotNull;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Objects;

public class OrderNote implements Comparable<OrderNote> {

    @NotBlank
    @Max(20)
    private String name;
    @Max(256)
    @NotBlank
    private String note;

    private LocalDateTime date = LocalDateTime.now();

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

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderNote orderNote = (OrderNote) o;
        return name.equals(orderNote.name) && note.equals(orderNote.note) && date.equals(orderNote.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, note, date);
    }

    @Override
    public int compareTo(@NotNull OrderNote o) {
        return date.compareTo(o.getDate());
    }

}
