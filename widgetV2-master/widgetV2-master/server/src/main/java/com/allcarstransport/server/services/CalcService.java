package com.allcarstransport.server.services;

import com.allcarstransport.server.dtos.calc.CalcConfigDTO;
import com.allcarstransport.server.dtos.calc.CalcPriceRequest;
import com.allcarstransport.server.dtos.calc.DistanceDTO;
import com.allcarstransport.server.dtos.calc.PriceDTO;

public interface CalcService {

    void initMultipliers();

    CalcConfigDTO getConfig();

    void saveConfig(CalcConfigDTO config);

    PriceDTO calcPrice(CalcPriceRequest request);

}
