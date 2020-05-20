package uz.sav.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.sav.market.entity.catalogs.Magazine;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.UUID;

public interface MagazineRepository extends JpaRepository<Magazine, UUID> {

    Optional<Magazine> findByUserId(UUID userId);
}
