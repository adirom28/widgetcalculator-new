package com.allcarstransport.server.services.implementation;

import com.allcarstransport.server.dtos.calc.CalcConfigDTO;
import com.allcarstransport.server.dtos.calc.CalcPriceRequest;
import com.allcarstransport.server.dtos.calc.Car;
import com.allcarstransport.server.dtos.calc.DistanceDTO;
import com.allcarstransport.server.dtos.calc.PriceDTO;
import com.allcarstransport.server.exception.ServerException;
import com.allcarstransport.server.persistance.entities.CarModel;
import com.allcarstransport.server.persistance.entities.CountDiscount;
import com.allcarstransport.server.persistance.entities.DistanceMultiplier;
import com.allcarstransport.server.persistance.entities.MinPriceConfig;
import com.allcarstransport.server.persistance.entities.Multiplier;
import com.allcarstransport.server.persistance.enums.Category;
import com.allcarstransport.server.persistance.enums.MultiplierType;
import com.allcarstransport.server.persistance.enums.OpenEnclosedType;
import com.allcarstransport.server.persistance.enums.RunningType;
import com.allcarstransport.server.persistance.repositories.CarModelRepository;
import com.allcarstransport.server.persistance.repositories.CountDiscountRepository;
import com.allcarstransport.server.persistance.repositories.DistanceMultiplierRepository;
import com.allcarstransport.server.persistance.repositories.MinPriceRepository;
import com.allcarstransport.server.persistance.repositories.MultiplierRepository;
import com.allcarstransport.server.services.CalcService;
import com.allcarstransport.server.services.PlaceService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.EnumMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Service
public class CalcServiceImpl implements CalcService {
    public static final Integer MIN_PRICE = 75;
    public static final Integer MIN_PRICE_DISTANCE = 250;

    private final MultiplierRepository multiplierRepository;
    private final DistanceMultiplierRepository distanceMultiplierRepository;
    private final MinPriceRepository minPriceRepository;
    private final CarModelRepository carModelRepository;
    private final CountDiscountRepository countDiscountRepository;
    private final PlaceService placeService;

    public CalcServiceImpl(MultiplierRepository multiplierRepository,
                           DistanceMultiplierRepository distanceMultiplierRepository, MinPriceRepository minPriceRepository,
                           CarModelRepository carModelRepository, CountDiscountRepository countDiscountRepository,
                           PlaceService placeService) {
        this.multiplierRepository = multiplierRepository;
        this.distanceMultiplierRepository = distanceMultiplierRepository;
        this.minPriceRepository = minPriceRepository;
        this.carModelRepository = carModelRepository;
        this.countDiscountRepository = countDiscountRepository;
        this.placeService = placeService;
    }

    @Override
    public void saveConfig(CalcConfigDTO config) {
        saveDistanceMultipliers(config.getPricePerMileByCategories());
        saveMinPriceConfig(config.getMinPrice(), config.getMinPriceDistance());
        saveMaxPrices(config.getMaxPriceByCategories());
        saveCountDiscounts(config.getCountDiscounts());
        saveMultiplier(MultiplierType.ENCLOSED, config.getEnclosed());
        saveMultiplier(MultiplierType.CASH_DISCOUNT, config.getCashDiscount());
        saveMultiplier(MultiplierType.NOT_RUNNING, config.getNotRunning());
    }

    private void saveMinPriceConfig(Integer minPrice, Integer minPriceDistance) {
        Optional<MinPriceConfig> minPriceConfig = minPriceRepository.findById(0L);
        MinPriceConfig minPriceConfigResult = minPriceConfig.map(p -> {
            p.setMinPrice(minPrice == null ? p.getMinPrice() : minPrice);
            p.setMinPriceDistance(minPriceDistance == null ? p.getMinPriceDistance() : minPriceDistance);
            return p;
        }).orElse(new MinPriceConfig(minPrice, minPriceDistance));
        minPriceRepository.save(minPriceConfigResult);
    }

    private void saveMaxPrices(Map<Category, Integer> maxPriceByCategories) {
        if (CollectionUtils.isEmpty(maxPriceByCategories)) {
            return;
        }

        for (Map.Entry<Category, Integer> entry : maxPriceByCategories.entrySet()) {
            if (entry.getValue() != null) {
                Optional<DistanceMultiplier> multiplierOptional = distanceMultiplierRepository.findById(entry.getKey());
                multiplierOptional.ifPresent(carTypeMultiplier -> {
                    carTypeMultiplier.setMaxValue(entry.getValue());
                    distanceMultiplierRepository.save(carTypeMultiplier);
                });
            }
        }

    }

    private void saveDistanceMultipliers(Map<Category, Float> distanceMultipliers) {
        if (CollectionUtils.isEmpty(distanceMultipliers)) {
            return;
        }

        for (Map.Entry<Category, Float> entry : distanceMultipliers.entrySet()) {
            if (entry.getValue() != null) {
                Optional<DistanceMultiplier> multiplierOptional = distanceMultiplierRepository.findById(entry.getKey());
                multiplierOptional.ifPresent(carTypeMultiplier -> {
                    carTypeMultiplier.setValue(entry.getValue());
                    distanceMultiplierRepository.save(carTypeMultiplier);
                });
            }
        }

    }

    private void saveMultiplier(MultiplierType type, Float multiplier) {
        if (multiplier == null) {
            return;
        }

        Optional<Multiplier> multiplierOptional = multiplierRepository.findById(type);
        multiplierOptional.ifPresent(carTypeMultiplier -> {
            carTypeMultiplier.setValue(multiplier);
            multiplierRepository.save(carTypeMultiplier);
        });

    }

    private void saveCountDiscounts(Map<Integer, Integer> countDiscounts) {
        countDiscountRepository.deleteAll();
        countDiscountRepository.saveAll(countDiscounts.entrySet().stream()
                .map(e -> new CountDiscount(e.getKey(), e.getValue()))
                .collect(Collectors.toSet()));
    }

    @Override
    @Cacheable(cacheManager = "calculationCacheManager", value = "calculation")
    public PriceDTO calcPrice(CalcPriceRequest request) {

        DistanceDTO distanceDTO = placeService.getDistance(request.getPlaceFromId(), request.getPlaceToId());
        Double distance = distanceDTO.getDistance();

        Integer resultPrice = request.getCars().stream()
                .mapToInt(c -> calcPriceForCar(request, distance, c))
                .sum();

        MinPriceConfig minPriceConfig = getMinPriceConfig();
        if (distance < minPriceConfig.getMinPriceDistance()) {
            resultPrice = minPriceConfig.getMinPrice() + resultPrice;
        }

        if (request.getCars().size() > 1) {
            CountDiscount countDiscountEntity = countDiscountRepository.findFirstByCountLessThanOrderByCountDesc(request.getCars().size());
            if (countDiscountEntity != null) {
                double countDiscount =
                        countDiscountEntity.getDiscount().doubleValue();
                resultPrice = (int) Math.round(resultPrice * (1 - countDiscount / 100));
            }
        }

        return new PriceDTO(resultPrice, Math.round(resultPrice * (1 - getCashDiscount() / 100)));

    }

    private Integer calcPriceForCar(CalcPriceRequest request, Double distance, Car car) {

        Optional<CarModel> modelOptional = carModelRepository.findById(car.getModelId());
        CarModel carModel;
        if (modelOptional.isPresent()) {
            carModel = modelOptional.get();
        } else {
            throw new ServerException(
                    "Car model with id " + car.getModelId() + " not found!!!",
                    HttpStatus.BAD_REQUEST
            );
        }

        if (distance != null) {
            double priceForDistance;

            if (carModel.getSpecialPricePerMi() != null) {
                priceForDistance = distance * carModel.getSpecialPricePerMi();
            } else {
                Optional<DistanceMultiplier> distanceOptional = distanceMultiplierRepository.findById(carModel.getCategory());
                if (distanceOptional.isPresent()) {
                    DistanceMultiplier distanceMultiplier = distanceOptional.get();
                    priceForDistance = distance * distanceMultiplier.getValue();
                } else {
                    throw new ServerException(
                            format("Distance multiplier with id=%s not found!!!", carModel.getCategory()),
                            HttpStatus.BAD_REQUEST
                    );
                }
            }

            double openEnclosedAddValue = getOpenEnclosedAdditionalValue(priceForDistance, request.getOpenEnclosed());
            double runningAddValue = getRunningAdditionalValue(priceForDistance, car.getRunningType());

            // CAT_3 if there is special price for car
            Category category = carModel.getSpecialPricePerMi() != null ? Category.CAT_3 : carModel.getCategory();
            int maxPrice = Math.min((int) Math.round(priceForDistance), getMaxPriceByCategory().get(category));
            return (int) Math.round(maxPrice + openEnclosedAddValue + runningAddValue);
        }

        return 0;
    }

    private Double getOpenEnclosedAdditionalValue(Double priceForDistance, OpenEnclosedType type) {
        if (type == OpenEnclosedType.enclosed) {
            Optional<Multiplier> enclosedOptional = multiplierRepository.findById(MultiplierType.ENCLOSED);
            if (enclosedOptional.isPresent()) {
                return priceForDistance * enclosedOptional.get().getValue() / 100;
            }

            throw new ServerException(
                    format("Price multiplier with type %s not found!!!", MultiplierType.ENCLOSED.name()),
                    HttpStatus.BAD_REQUEST
            );
        }

        return 0.0;
    }

    private Double getRunningAdditionalValue(Double priceForDistance, RunningType type) {
        if (type == RunningType.no) {
            Optional<Multiplier> runningOptional = multiplierRepository.findById(MultiplierType.NOT_RUNNING);
            if (runningOptional.isPresent()) {
                return priceForDistance * runningOptional.get().getValue() / 100;
            }

            throw new ServerException(
                    format("Price multiplier with type %s not found!!!", MultiplierType.NOT_RUNNING),
                    HttpStatus.BAD_REQUEST
            );
        }

        return 0.0;
    }

    private float getCashDiscount() {
        Optional<Multiplier> cashDiscountOptional = multiplierRepository.findById(MultiplierType.CASH_DISCOUNT);
        return cashDiscountOptional.orElseThrow(() -> new ServerException(
                        format("Price multiplier with type %s not found!!!", MultiplierType.CASH_DISCOUNT),
                        HttpStatus.BAD_REQUEST
                ))
                .getValue();
    }

    @Override
    public CalcConfigDTO getConfig() {
        MinPriceConfig minPriceConfig = getMinPriceConfig();
        return new CalcConfigDTO(
                getDistanceMultipliers(),
                getMaxPriceByCategory(),
                countDiscountRepository.findAll().stream()
                        .collect(Collectors.toMap(CountDiscount::getCount, CountDiscount::getDiscount)),
                minPriceConfig.getMinPrice(),
                minPriceConfig.getMinPriceDistance(),
                getMultiplier(MultiplierType.ENCLOSED),
                getMultiplier(MultiplierType.CASH_DISCOUNT),
                getMultiplier(MultiplierType.NOT_RUNNING)
        );
    }

    private MinPriceConfig getMinPriceConfig() {
        return minPriceRepository.findById(0L)
                .orElseThrow(() -> new RuntimeException("Min price is not present in DB!"));
    }

    private Map<Category, Float> getDistanceMultipliers() {
        Map<Category, Float> map = new EnumMap<>(Category.class);

        for (DistanceMultiplier distanceMultiplier : distanceMultiplierRepository.findAll()) {
            map.put(distanceMultiplier.getCategory(), distanceMultiplier.getValue());
        }

        return map;
    }

    private Map<Category, Integer> getMaxPriceByCategory() {
        Map<Category, Integer> map = new EnumMap<>(Category.class);

        for (DistanceMultiplier distanceMultiplier : distanceMultiplierRepository.findAll()) {
            map.put(distanceMultiplier.getCategory(), distanceMultiplier.getMaxValue());
        }

        return map;
    }

    private Float getMultiplier(MultiplierType type) {
        return multiplierRepository.findById(type).orElseThrow(() -> new ServerException(
                        format("Price multiplier with type %s not found!!!", MultiplierType.ENCLOSED),
                        HttpStatus.BAD_REQUEST
                ))
                .getValue();
    }

    @Override
    public void initMultipliers() {
        for (Category type : Category.values()) {
            createCarCategoryMultiplierIfNotExists(type);
        }

        for (MultiplierType type : MultiplierType.values()) {
            createMultiplierIfNotExists(type);
        }

        createMinPriceIfNotExists(MIN_PRICE, MIN_PRICE_DISTANCE);
    }

    private void createMultiplierIfNotExists(MultiplierType type) {
        Optional<Multiplier> multiplierOptional = multiplierRepository.findById(type);
        if (multiplierOptional.isEmpty()) {
            Multiplier multiplier = new Multiplier(type, type.getDefaultValue());
            multiplierRepository.save(multiplier);
        }
    }

    private void createMinPriceIfNotExists(Integer minPrice, Integer minDistance) {
        Optional<MinPriceConfig> minPriceConfig = minPriceRepository.findById(0L);
        if (minPriceConfig.isEmpty()) {
            minPriceRepository.save(new MinPriceConfig(minPrice, minDistance));
        }
    }

    private void createCarCategoryMultiplierIfNotExists(Category type) {
        Optional<DistanceMultiplier> multiplierOptional = distanceMultiplierRepository.findById(type);
        if (multiplierOptional.isEmpty()) {
            DistanceMultiplier multiplier = new DistanceMultiplier(type, type.getDefaultValue(), type.getMaxPrice());
            distanceMultiplierRepository.save(multiplier);
        }
    }

}
