package com.allcarstransport.server.dtos;

import org.springframework.data.domain.Sort;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class PageRequest {

    @NotNull
    @Min(1)
    protected Integer pageSize;

    @NotNull
    @Min(0)
    protected Integer pageNumber;

    @NotBlank
    protected String sortingField;

    @NotNull
    protected Sort.Direction sortingDirection;

    public Integer getPageSize() {
        return pageSize;
    }

    public Integer getPageNumber() {
        return pageNumber;
    }

    public String getSortingField() {
        return sortingField;
    }

    public Sort.Direction getSortingDirection() {
        return sortingDirection;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public void setSortingField(String sortingField) {
        this.sortingField = sortingField;
    }

    public void setSortingDirection(Sort.Direction sortingDirection) {
        this.sortingDirection = sortingDirection;
    }

    @Override
    public String toString() {
        return "PageRequest{" +
                "pageSize=" + pageSize +
                ", pageNumber=" + pageNumber +
                ", sortingField='" + sortingField + '\'' +
                ", sortingDirection=" + sortingDirection +
                '}';
    }

}
