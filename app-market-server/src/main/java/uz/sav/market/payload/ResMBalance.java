package uz.sav.market.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResMBalance {

    private UUID id;

    private UUID magazineId;

    private String magazineName;

    private Double balance;

    private String extraInfo;
}
