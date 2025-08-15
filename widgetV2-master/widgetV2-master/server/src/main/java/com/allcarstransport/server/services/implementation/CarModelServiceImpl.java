package com.allcarstransport.server.services.implementation;

import com.allcarstransport.server.dtos.calc.CarModelDTO;
import com.allcarstransport.server.persistance.entities.CarModel;
import com.allcarstransport.server.persistance.enums.Category;
import com.allcarstransport.server.persistance.repositories.CarModelRepository;
import com.allcarstransport.server.services.CarModelService;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarModelServiceImpl implements CarModelService {

    private static final String YEAR_FIELD = "year";
    private static final String MAKER_FIELD = "maker";
    private static final String MODEL_FIELD = "model";

    private final CarModelRepository repository;
    private final RestTemplate restTemplate;
    private final MongoTemplate mongoTemplate;

    public CarModelServiceImpl(CarModelRepository repository, RestTemplate restTemplate,
                               MongoTemplate mongoTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<String> getYears(Integer part) {
        Query query = new Query();
        if (part != null) {
            query = query.addCriteria(Criteria.where(YEAR_FIELD).regex("^.*" + part + ".*$"));
        }
        query.with(Sort.by(Sort.Direction.ASC, YEAR_FIELD));

        List<String> list = mongoTemplate.findDistinct(query, YEAR_FIELD, CarModel.DOCUMENT_NAME, String.class);
        list.sort(Comparator.reverseOrder());

        return list;
    }

    @Override
    public List<String> getMakers(@NonNull Integer year, String part) {
        Query query = new Query();

        Criteria criteria = Criteria.where(YEAR_FIELD).is(year.toString());
        if (part != null) {
            criteria = criteria.and(MAKER_FIELD).regex("^.*" + part + ".*$", "i");
        }

        query.addCriteria(criteria);
        query.with(Sort.by(Sort.Direction.ASC, MAKER_FIELD));

        return mongoTemplate.findDistinct(query, MAKER_FIELD, CarModel.DOCUMENT_NAME, String.class);
    }

    @Override
    public List<CarModel> getModels(Integer year, String maker, String part) {
        Query query = new Query();

        Criteria criteria = Criteria.where(YEAR_FIELD).is(year.toString()).and(MAKER_FIELD).is(maker);
        if (part != null) {
            criteria = criteria.and(MODEL_FIELD).regex("^.*" + part + ".*$", "i");
        }

        query.addCriteria(criteria);
        query.with(Sort.by(Sort.Direction.ASC, MODEL_FIELD));

        return mongoTemplate.find(query, CarModel.class);
    }

    private Category getCategory(String type) {
        switch (type) {
            case "sedan small":
                return Category.CAT_1;
            case "mini-van":
            case "pickup small":
            case "classic cars large":
                return Category.CAT_3;
            case "pickup ext cab":
            case "pickup dually":
            case "pickup crew cab":
            case "passenger van (over 12 people)":
            case "passenger van (8-12 people)":
            case "cargo van small":
            case "cargo van large":
                return Category.CAT_4;
            case "suv midsize":
            case "sedan midsize":
            case "sedan large":
            case "sedan compact":
            default:
                return Category.CAT_2;
        }
    }

    private CarModel dtoToEntity(CarModelDTO dto) {
        CarModel entity = new CarModel();
        entity.setYear(Optional.ofNullable(dto.getYear()).map(Object::toString).orElse(null));
        entity.setMaker(dto.getMaker());
        entity.setModel(dto.getModel());
        entity.setType(dto.getType());
        entity.setCategory(getCategory(dto.getType()));

        return entity;
    }

    @Override
//    @Scheduled(cron = "${models.update.cron}")
    public void update() {

        List<CarModelDTO> dtos;

        try {
            ResponseEntity<List<CarModelDTO>> exchange = restTemplate.exchange("https://done.ship.cars/models/",
                    HttpMethod.GET, null, new ParameterizedTypeReference<>() {
                    });

            dtos = exchange.getBody();
        } catch(Exception e) {
            return;
        }

        if (!CollectionUtils.isEmpty(dtos)) {
            repository.deleteAll();
            repository.saveAll(dtos.stream().map(this::dtoToEntity).collect(Collectors.toList()));
        }

    }

}
