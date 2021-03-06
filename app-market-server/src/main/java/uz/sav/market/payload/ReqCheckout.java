package uz.sav.market.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.sav.market.entity.catalogs.CashDesk;
import uz.sav.market.entity.catalogs.Magazine;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReqCheckout {

    // KASSA
    private String code;

    private UUID cashDeskId;

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
