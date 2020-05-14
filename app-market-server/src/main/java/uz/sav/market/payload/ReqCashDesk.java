package uz.sav.market.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqCashDesk {

    private UUID id;

    private String externalCode;

    private UUID magazineId;

    private UUID mBalanceId;

    private String name;

    private String extraInfo;
}
