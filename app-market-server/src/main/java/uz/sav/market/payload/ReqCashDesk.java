package uz.sav.market.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import uz.sav.market.entity.enums.StatusEnum;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqCashDesk {

    private UUID id;

    private String externalCode;

    private UUID magazineId;

    @JsonProperty("mBalanceId")
    private UUID mBalanceId;

    private String name;

    private String extraInfo;

    private StatusEnum statusEnum;
}
