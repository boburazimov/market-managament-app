package uz.sav.market.repository.rest.projection;

import org.springframework.data.rest.core.config.Projection;
import uz.sav.market.entity.catalogs.Role;
import uz.sav.market.entity.enums.RoleNameEnum;

@Projection(name = "/customRole", types = Role.class)
public interface CustomRole {

    Integer getId();

    RoleNameEnum getName();
}
