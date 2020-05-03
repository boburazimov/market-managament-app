package uz.sav.market.repository.rest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import uz.sav.market.entity.catalogs.CashDesk;
import uz.sav.market.repository.rest.projection.CustomCashDesk;

import java.util.UUID;

@CrossOrigin
@RepositoryRestResource(path = "cashDesk", collectionResourceRel = "list", excerptProjection = CustomCashDesk.class)
public interface CashDeskRepository extends JpaRepository<CashDesk, UUID> {
}
