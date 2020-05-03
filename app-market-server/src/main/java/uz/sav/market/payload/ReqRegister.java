package uz.sav.market.payload;

import lombok.Data;
import uz.sav.market.entity.catalogs.Role;
import uz.sav.market.entity.enums.StatusEnum;

import java.util.List;

@Data
public class ReqRegister {

    private String externalCode;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String email;

    private String password;

    private String prePassword;

    private StatusEnum statusEnum;

    private List<Role> roles;
}
