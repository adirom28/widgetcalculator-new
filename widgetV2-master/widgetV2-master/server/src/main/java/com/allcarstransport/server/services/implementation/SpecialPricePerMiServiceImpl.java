package com.allcarstransport.server.services.implementation;

import com.allcarstransport.server.dtos.calc.UpdateSpecialPriceRequest;
import com.allcarstransport.server.exception.ServerException;
import com.allcarstransport.server.persistance.entities.CarModel;
import com.allcarstransport.server.persistance.repositories.CarModelRepository;
import com.allcarstransport.server.services.SpecialPricePerMiService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpecialPricePerMiServiceImpl implements SpecialPricePerMiService {

    private final CarModelRepository modelRepository;

    public SpecialPricePerMiServiceImpl(CarModelRepository modelRepository) {
        this.modelRepository = modelRepository;
    }

    @Override
    public List<CarModel> getList() {
        return modelRepository.findAllBySpecialPricePerMiIsNotNull();
    }

    @Override
    public void delete(ObjectId id) {
        Optional<CarModel> modelOptional = modelRepository.findById(id);
        if (modelOptional.isPresent()) {
            CarModel carModel = modelOptional.get();
            carModel.setSpecialPricePerMi(null);

            modelRepository.save(carModel);
        } else {
            throw new ServerException(
                    "Car model with id " + id + " not found!!!",
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @Override
    public void update(List<UpdateSpecialPriceRequest> listRequests) {
        for (UpdateSpecialPriceRequest request : listRequests) {
            Optional<CarModel> modelOptional = modelRepository.findById(request.getId());
            if (modelOptional.isPresent()) {
                CarModel carModel = modelOptional.get();
                carModel.setSpecialPricePerMi(request.getPrice());

                modelRepository.save(carModel);
            } else {
                throw new ServerException(
                        "Car model with id " + request.getId() + " not found!!!",
                        HttpStatus.BAD_REQUEST
                );
            }
        }
    }

}
