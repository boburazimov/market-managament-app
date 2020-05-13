package uz.sav.market.service;

import org.springframework.stereotype.Service;
import uz.sav.market.entity.enums.PayMethodEnum;

import java.util.Arrays;
import java.util.List;

@Service
public class PayMethodEnumService {

    public List<PayMethodEnum> getPayMethods() {
        return Arrays.asList(PayMethodEnum.values());
    }
}
