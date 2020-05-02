package uz.sav.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.sav.market.entity.catalogs.MBalance;

import java.util.UUID;

public interface MBalanceRepository extends JpaRepository<MBalance, UUID> {
}
