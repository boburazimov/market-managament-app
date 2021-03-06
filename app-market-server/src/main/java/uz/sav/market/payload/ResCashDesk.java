package uz.sav.market.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.sav.market.entity.enums.StatusEnum;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResCashDesk {

    private UUID id;

    private String externalCode;

    private String name;

    private UUID magazineId;

    private String magazineName;

    private UUID mBalanceId;

    private Double balanceValue;

    private String extraInfo;

    private StatusEnum statusEnum;
}
