package uz.sav.market.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqMBalance {

    private UUID id;

    private List<UUID> magazinesId;

    private Double balance;

    private String extraInfo;
}
