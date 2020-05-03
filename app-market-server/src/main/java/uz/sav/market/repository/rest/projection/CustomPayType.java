package uz.sav.market.repository.rest.projection;

import org.springframework.data.rest.core.config.Projection;
import uz.sav.market.entity.catalogs.PayType;

@Projection(name = "/customPayType", types = PayType.class)
public interface CustomPayType {

    Integer getId();

    String getName();
}
