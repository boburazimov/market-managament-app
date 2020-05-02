package uz.sav.market.repository.rest.projection;

import org.springframework.data.rest.core.config.Projection;
import uz.sav.market.entity.catalogs.CashBox;

import java.util.UUID;

@Projection(name = "customCashBox", types = CashBox.class)
public interface CustomCashBox {

    UUID getId();

    String getName();
}
