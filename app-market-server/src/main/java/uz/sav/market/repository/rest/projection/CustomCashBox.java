package uz.sav.market.repository.rest.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import uz.sav.market.entity.catalogs.CashBox;
import uz.sav.market.entity.catalogs.Currency;

import java.util.UUID;

@Projection(name = "customCashBox", types = CashBox.class)
public interface CustomCashBox {

    UUID getId();

    String getExternalCode();

    String getName();

    Currency getCurrency();

    @Value("#{target.currency?.id?:null}")
    Integer getCurrencyId();

    String getExtraInfo();
}
