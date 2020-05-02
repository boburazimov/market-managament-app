package uz.sav.market.entity.documents;

import uz.sav.market.entity.catalogs.Magazine;
import uz.sav.market.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import java.util.Date;

public class Checkout extends AbsEntity {

    // KASSA
    @Column(unique = true)
    private String code;

    @Column(nullable = false)
    private Date checkoutDate;

    @ManyToOne(optional = false)
    private Magazine magazine;

    @Column(nullable = false)
    private Double salesOfDate;

    @Column(nullable = false, length = 12)
    private Double encashment;

    @Column(nullable = false, length = 12)
    private Double totalEncashmentOfDate;

    // ARTIX
    @Column(nullable = false, length = 12)
    private Double artixSalesUzs;

    @Column(nullable = false, length = 12)
    private Double artixSalesUzk;

    @Column(length = 12)
    private Double returnCkeck;

    @Column(nullable = false, length = 12)
    private Double netArtixSalesUzs;

    @Column(nullable = false, length = 12)
    private Double netArtixSalesUzk;

    @Column(nullable = false, length = 12)
    private Double totalArtixSales;

    // CHEKING
    @Column(length = 12)
    private Double differenceUzs;

    @Column(length = 12)
    private Double differenceUzk;

    private Double correction;

    private String extraInfo;
}
