package com.allcarstransport.server.dtos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.Collection;
import java.util.stream.Collectors;

public class PageResponse<T> {

    private final Integer pageSize;
    private final Integer pageNumber;
    private final String sortingField;
    private final Sort.Direction sortingDirection;
    private final Long count;
    private final Integer pageCount;
    private final Collection<T> data;

    public PageResponse(PageRequest pageRequest, Page<T> page) {
        this.pageSize = pageRequest.getPageSize();
        this.pageNumber = pageRequest.getPageNumber();
        this.sortingField = pageRequest.getSortingField();
        this.sortingDirection = pageRequest.getSortingDirection();
        this.count = page.getTotalElements();
        this.pageCount = page.getTotalPages();
        this.data = page.get().collect(Collectors.toList());
    }

    public Long getCount() {
        return count;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public Collection<T> getData() {
        return data;
    }

    @Override
    public String toString() {
        return "PageResponse{" +
                "pageSize=" + pageSize +
                ", pageNumber=" + pageNumber +
                ", sortingField='" + sortingField + '\'' +
                ", sortingDirection=" + sortingDirection +
                ", count=" + count +
                ", pageCount=" + pageCount +
                ", data=" + data +
                '}';
    }

}
