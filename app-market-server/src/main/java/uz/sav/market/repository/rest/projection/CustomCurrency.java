package uz.sav.market.repository.rest.projection;

import org.springframework.data.rest.core.config.Projection;
import uz.sav.market.entity.catalogs.Currency;

import java.util.UUID;

@Projection(name = "customCurrency", types = Currency.class)
public interface CustomCurrency {

    Integer getId();

    String getFullName();

    String getSymbolCode();

    String getExtraInfo();
}
