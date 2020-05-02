package uz.sav.market.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResMagazine {

    private UUID id;

    private String name;

    private Long softCode;

    private UUID userId;

    private String userName;

    private UUID balanceId;

    private Double balance;

    private String extraInfo;
}
