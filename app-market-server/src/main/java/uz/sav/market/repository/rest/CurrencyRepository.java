package uz.sav.market.repository.rest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import uz.sav.market.entity.catalogs.Currency;
import uz.sav.market.repository.rest.projection.CustomCurrency;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(path = "currency", collectionResourceRel = "currency", excerptProjection = CustomCurrency.class)
public interface CurrencyRepository extends JpaRepository<Currency, Integer> {
//    List<Currency> findBySymbolCode(@Param("symbolCode") String symbolCode);
}