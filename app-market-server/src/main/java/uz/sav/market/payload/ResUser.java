package uz.sav.market.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.sav.market.entity.catalogs.Role;
import uz.sav.market.entity.enums.StatusEnum;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResUser {

    private UUID id;

    private String externalCode;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String email;

    private StatusEnum statusEnum;

    private List<Role> roles;

    public ResUser(UUID id, String phoneNumber) {
        this.id = id;
        this.phoneNumber = phoneNumber;
    }
}
