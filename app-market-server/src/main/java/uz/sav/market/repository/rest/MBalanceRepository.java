package uz.sav.market.repository.rest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import uz.sav.market.entity.catalogs.MBalance;
import uz.sav.market.repository.rest.projection.CustomMBalance;

import java.util.UUID;

@CrossOrigin
@RepositoryRestResource(path = "mBalance", collectionResourceRel = "mBalance", excerptProjection = CustomMBalance.class)
public interface MBalanceRepository extends JpaRepository<MBalance, UUID> {
}
