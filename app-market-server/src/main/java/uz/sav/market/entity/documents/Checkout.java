package uz.sav.market.entity.documents;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.sav.market.entity.catalogs.CashDesk;
import uz.sav.market.entity.catalogs.Magazine;
import uz.sav.market.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Checkout extends AbsEntity {

    // KASSA
    @Column(unique = true)
    private String code;

    @ManyToOne(optional = false)
    private CashDesk cashDesk;

    @Column(nullable = false)
    private Date checkoutDate;

    @Column(nullable = false, length = 12)
    private Double clearUzs;

    @Column(nullable = false, length = 12)
    private Double clearUzk;

    @Column(length = 12)
    private Double onlineCard;
    @Column(length = 12)
    private Double unionPayCard;
    @Column(length = 12)
    private Double humoCard;

    private Double accumFail;

    // ARTIX
    @Column(nullable = false, length = 12)
    private Double artixUzs;

    @Column(nullable = false, length = 12)
    private Double artixUzk;

    @Column(length = 12)
    private Double artixReturn;

    // CHEKING
    @Column(length = 12)
    private Double differUzs;

    @Column(length = 12)
    private Double differUzk;

    @Column(length = 12)
    private Double collectMoney;

    private Double endBalance;

    private String extraInfo;
}
