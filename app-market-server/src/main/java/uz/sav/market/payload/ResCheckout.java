package uz.sav.market.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResCheckout {

    // KASSA
    private String code;

    private Date checkoutDate;

    private UUID magazineId;

    private String magazineName;

    private Double salesOfDate;

    private Double encashment;

    // ARTIX
    private Double artixSalesUzs;

    private Double artixSalesUzk;

    private Double returnCkeck;

    private Double netArtixSalesUzs;

    private Double netArtixSalesUzk;

    private Double totalArtixSales;

    // CHEKING
    private Double differenceUzs;

    private Double differenceUzk;

    private Double correction;

    private String extraInfo;
}
