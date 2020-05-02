package uz.sav.market.service;

import org.springframework.stereotype.Service;
import uz.sav.market.entity.enums.StatusEnum;

import java.util.Arrays;
import java.util.List;

@Service
public class StatusEnumService {

    public List<StatusEnum> getStatusEnums() {
        return Arrays.asList(StatusEnum.values());
    }
}
