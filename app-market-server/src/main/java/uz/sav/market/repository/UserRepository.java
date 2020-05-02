package uz.sav.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.sav.market.entity.catalogs.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByPhoneNumber(String phoneNumber);

    Optional<User> findByPhoneNumber(String phoneNumber);
}
