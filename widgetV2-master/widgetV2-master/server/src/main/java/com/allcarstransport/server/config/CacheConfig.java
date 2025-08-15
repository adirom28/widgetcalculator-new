package com.allcarstransport.server.config;

import com.github.benmanes.caffeine.cache.CaffeineSpec;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    @Primary
    public CacheManager distanceCacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeineSpec(CaffeineSpec.parse("maximumSize=5000,expireAfterWrite=1000d"));
        return cacheManager;
    }

    @Bean
    public CacheManager calculationCacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeineSpec(CaffeineSpec.parse("maximumSize=5000,expireAfterWrite=1000d"));
        return cacheManager;
    }

}
