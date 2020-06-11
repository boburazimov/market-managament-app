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

    private UUID cashDeskId;

    private String cashDeskName;

    private Date checkoutDate;

    private Double clearUzs;

    private Double clearUzk;

    private Double onlineCard;
    private Double unionPayCard;
    private Double humoCard;

    private Double accumFail;

    // ARTIX
    private Double artixUzs;

    private Double artixUzk;

    private Double artixReturn;

    // CHEKING
    private Double differUzs;

    private Double differUzk;

    private Double collectMoney;

    private Double endBalance;

    private String extraInfo;
}
