package uz.sav.market.repository.rest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uz.sav.market.entity.catalogs.PayType;
import uz.sav.market.repository.rest.projection.CustomPayType;

@RepositoryRestResource(path = "/payType", excerptProjection = CustomPayType.class)
public interface PayTypeRepository extends JpaRepository<PayType, Integer> {
}
