package uz.sav.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uz.sav.market.entity.catalogs.CashDesk;
import uz.sav.market.entity.enums.StatusEnum;

import java.util.List;
import java.util.UUID;

public interface CashDeskRepository extends JpaRepository<CashDesk, UUID> {

    List<CashDesk> findAllByMagazineIdAndAndStatusEnum(UUID magazineId, StatusEnum statusEnum);
}
