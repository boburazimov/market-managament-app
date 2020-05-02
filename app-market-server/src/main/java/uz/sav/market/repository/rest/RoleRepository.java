package uz.sav.market.repository.rest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uz.sav.market.entity.catalogs.Role;
import uz.sav.market.entity.enums.RoleNameEnum;

@RepositoryRestResource(path = "/role")
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByName(RoleNameEnum name);
}
