package com.allcarstransport.server.services.implementation;

import com.allcarstransport.server.dtos.calc.DistanceDTO;
import com.allcarstransport.server.dtos.places.PlaceDTO;
import com.allcarstransport.server.exception.ServerException;
import com.allcarstransport.server.persistance.enums.State;
import com.allcarstransport.server.services.PlaceService;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.PendingResult;
import com.google.maps.PlaceAutocompleteRequest;
import com.google.maps.PlaceDetailsRequest;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.AutocompletePrediction;
import com.google.maps.model.ComponentFilter;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.PlaceAutocompleteType;
import com.google.maps.model.PlaceDetails;
import com.google.maps.model.Unit;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PlaceServiceImpl implements PlaceService {

    private final GeoApiContext geoApiContext;

    public PlaceServiceImpl(GeoApiContext geoApiContext) {
        this.geoApiContext = geoApiContext;
    }

    @Override
    @Cacheable(cacheManager = "distanceCacheManager", value = "distance")
    public DistanceDTO getDistance(String placeFromId, String placeToId) {
        DistanceMatrixApiRequest distanceMatrix =
                DistanceMatrixApi.getDistanceMatrix(geoApiContext,
                        new String[]{"place_id:" + placeFromId},
                        new String[]{"place_id:" + placeToId}
                );
        distanceMatrix.units(Unit.METRIC);

        DistanceMatrix result = handleApiRequest(
                distanceMatrix,
                "Error occurred while distance fetching"
        );

        double km = result.rows[0].elements[0].distance.inMeters / 1000.0;
        double mi = km * 0.62137119;

        return new DistanceDTO(
                Math.round(mi * 10) / 10 + " mi",
                mi,
                result.rows[0].elements[0].duration.humanReadable
        );
    }

    @Override
    @Cacheable(cacheManager = "distanceCacheManager", value = "cities")
    public List<PlaceDTO> getCities(String part) {
        PlaceAutocompleteRequest placeAutocompleteRequest = PlacesApi.placeAutocomplete(geoApiContext, part, null);
        placeAutocompleteRequest.components(ComponentFilter.country("USA"));
        placeAutocompleteRequest.types(PlaceAutocompleteType.REGIONS);

        AutocompletePrediction[] predictions = handleApiRequest(
                placeAutocompleteRequest,
                "Error occurred while places fetching"
        );

        return Arrays.stream(predictions)
                .map(p -> new PlaceDTO(
                        p.placeId,
                        p.description.replace(", USA", ""),
                        p.terms[0].value,
                        p.terms[1].value
                ))
                .collect(Collectors.toList());

    }

    @Override
    @Cacheable(cacheManager = "distanceCacheManager", value = "postalCodes")
    public List<String> getPostalCodes(String placeFromId, String placeToId) {
        try {
            return List.of(CompletableFuture.completedFuture(getPostalCode(placeFromId)).get(),
                    CompletableFuture.completedFuture(getPostalCode(placeToId)).get());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ServerException("Error occurred while postal codes fetching", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (ExecutionException e) {
            throw new ServerException("Error occurred while postal codes fetching", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public Set<String> findStates(String part) {
        Stream<String> stream;
        if (StringUtils.hasText(part)) {
            stream = Arrays.stream(State.values())
                    .map(State::getAbbreviation)
                    .filter(abbreviation -> abbreviation.contains(part.toUpperCase()));
        } else {
            stream = Arrays.stream(State.values())
                    .map(State::getAbbreviation);
        }

        return stream.sorted().collect(Collectors.toCollection(TreeSet::new));
    }

    private String getPostalCode(String placeId) {
        PlaceDetailsRequest placeDetailsRequest = PlacesApi.placeDetails(geoApiContext, placeId);
        placeDetailsRequest.fields(PlaceDetailsRequest.FieldMask.values());

        PlaceDetails placeDetails = handleApiRequest(
                placeDetailsRequest,
                "Error occurred while postal code fetching"
        );

        return Arrays.stream(placeDetails.addressComponents)
                .filter(c -> c.types.length == 1 && c.types[0].name().equals("POSTAL_CODE"))
                .findFirst()
                .map(c -> c.shortName)
                .orElse(null);
    }

    private <T> T handleApiRequest(PendingResult<T> request, String requestDescription) {
        try {
            return request.await();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ServerException(requestDescription, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException | ApiException e) {
            throw new ServerException(requestDescription, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
