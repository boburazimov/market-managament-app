package uz.sav.market.repository.rest.projection;

import org.springframework.data.rest.core.config.Projection;
import uz.sav.market.entity.catalogs.CashDesk;

import java.util.UUID;

@Projection(name = "customCashDesk", types = CashDesk.class)
public interface CustomCashDesk {

    UUID getId();

    String getName();

    String getBalance();
}
