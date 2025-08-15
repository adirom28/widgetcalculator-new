package com.allcarstransport.server.persistance.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("max_price_config")
public class MinPriceConfig {
    // Can be only one instance
    @Id
    private Long id = 0L;
    private Integer minPrice;
    private Integer minPriceDistance;

    public MinPriceConfig() {}

    public MinPriceConfig(Integer minPrice, Integer minPriceDistance) {
        this.minPrice = minPrice;
        this.minPriceDistance = minPriceDistance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMinPrice(Integer minPrice) {
        this.minPrice = minPrice;
    }

    public void setMinPriceDistance(Integer minPriceDistance) {
        this.minPriceDistance = minPriceDistance;
    }

    public Integer getMinPrice() {
        return minPrice;
    }

    public Integer getMinPriceDistance() {
        return minPriceDistance;
    }

}
