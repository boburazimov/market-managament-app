package uz.sav.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.sav.market.entity.catalogs.CashDesk;

import java.util.UUID;

public interface CashDeskRepository extends JpaRepository<CashDesk, UUID> {
}
