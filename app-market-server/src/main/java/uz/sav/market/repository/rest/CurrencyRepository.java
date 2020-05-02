package uz.sav.market.repository.rest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import uz.sav.market.entity.catalogs.Currency;

@CrossOrigin
@RepositoryRestResource(path = "/currency", collectionResourceRel = "list", excerptProjection = Currency.class)
public interface CurrencyRepository extends JpaRepository<Currency, Integer> {
}
