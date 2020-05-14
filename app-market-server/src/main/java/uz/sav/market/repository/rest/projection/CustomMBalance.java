package uz.sav.market.repository.rest.projection;

import org.springframework.data.rest.core.config.Projection;
import uz.sav.market.entity.catalogs.MBalance;

import java.util.UUID;

@Projection(name = "customMBalance", types = MBalance.class)
public interface CustomMBalance {

    UUID getId();

    Double getBalanceValue();

    String getExtraInfo();
}
