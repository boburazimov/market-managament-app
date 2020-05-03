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

    private String externalCode;

    private String name;

    private UUID userId;

    private String phoneNumber;

    private String extraInfo;
}
