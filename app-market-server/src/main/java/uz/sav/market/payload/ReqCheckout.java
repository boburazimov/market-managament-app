package uz.sav.market.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.sav.market.entity.catalogs.Magazine;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReqCheckout {

    // KASSA
    private String code;

    private Date checkoutDate;

    private Magazine magazine;

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
