package uz.sav.market.repository.rest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import uz.sav.market.entity.catalogs.CashBox;
import uz.sav.market.repository.rest.projection.CustomCashBox;

import java.util.UUID;

@CrossOrigin
@RepositoryRestResource(path = "cashBox", collectionResourceRel = "cashBox", excerptProjection = CustomCashBox.class)
public interface CashBoxRepository extends JpaRepository<CashBox, UUID> {
}

