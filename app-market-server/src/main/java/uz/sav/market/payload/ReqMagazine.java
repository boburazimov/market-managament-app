package uz.sav.market.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqMagazine {

    private UUID id;

    private String name;

    private Long softCode;

    private UUID userId;

    private UUID balanceId;

    private String extraInfo;
}
