package com.allcarstransport.server.dtos.calc;

import com.allcarstransport.server.persistance.enums.Category;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.Map;

public class CalcConfigDTO {

    private Map<Category, Float> pricePerMileByCategories;
    private Map<Category, Integer> maxPriceByCategories;
    private Map<Integer, Integer> countDiscounts;

    @Min(0) @Max(9999999)
    private Integer minPrice;
    @Min(0) @Max(9999999)
    private Integer minPriceDistance;
    @Min(0) @Max(100)
    private Float enclosed;
    @Min(0) @Max(100)
    private Float cashDiscount;
    @Min(0) @Max(100)
    private Float notRunning;

    public CalcConfigDTO() {}

    public CalcConfigDTO(Map<Category, Float> pricePerMileByCategories, Map<Category, Integer> maxPriceByCategories,
                         Map<Integer, Integer> countDiscounts, Integer minPrice,
                         Integer minPriceDistance, Float enclosed,
                         Float cashDiscount, Float notRunning) {
        this.pricePerMileByCategories = pricePerMileByCategories;
        this.maxPriceByCategories = maxPriceByCategories;
        this.countDiscounts = countDiscounts;
        this.minPrice = minPrice;
        this.minPriceDistance = minPriceDistance;
        this.enclosed = enclosed;
        this.cashDiscount = cashDiscount;
        this.notRunning = notRunning;
    }

    public Map<Integer, Integer> getCountDiscounts() {
        return countDiscounts;
    }

    public void setCountDiscounts(Map<Integer, Integer> countDiscounts) {
        this.countDiscounts = countDiscounts;
    }

    public Float getNotRunning() {
        return notRunning;
    }

    public void setNotRunning(Float notRunning) {
        this.notRunning = notRunning;
    }

    public Map<Category, Float> getPricePerMileByCategories() {
        return pricePerMileByCategories;
    }

    public void setPricePerMileByCategories(Map<Category, Float> pricePerMileByCategories) {
        this.pricePerMileByCategories = pricePerMileByCategories;
    }

    public Map<Category, Integer> getMaxPriceByCategories() {
        return maxPriceByCategories;
    }

    public void setMaxPriceByCategories(Map<Category, Integer> maxPriceByCategories) {
        this.maxPriceByCategories = maxPriceByCategories;
    }

    public Float getEnclosed() {
        return enclosed;
    }

    public void setEnclosed(Float enclosed) {
        this.enclosed = enclosed;
    }

    public Float getCashDiscount() {
        return cashDiscount;
    }

    public void setCashDiscount(Float cashDiscount) {
        this.cashDiscount = cashDiscount;
    }

    public Integer getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Integer minPrice) {
        this.minPrice = minPrice;
    }

    public Integer getMinPriceDistance() {
        return minPriceDistance;
    }

    public void setMinPriceDistance(Integer minPriceDistance) {
        this.minPriceDistance = minPriceDistance;
    }

}
