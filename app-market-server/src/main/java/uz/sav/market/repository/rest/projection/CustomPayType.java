package uz.sav.market.repository.rest.projection;

import org.springframework.data.rest.core.config.Projection;
import uz.sav.market.entity.catalogs.PayType;
import uz.sav.market.entity.enums.PayMethodEnum;

@Projection(name = "customPayType", types = PayType.class)
public interface CustomPayType {

    Integer getId();

    PayMethodEnum getMethodEnum();

    String getName();

    String getExtraInfo();
}
