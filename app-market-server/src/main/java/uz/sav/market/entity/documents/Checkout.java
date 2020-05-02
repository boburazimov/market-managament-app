package uz.sav.market.entity.documents;

import uz.sav.market.entity.catalogs.Magazine;
import uz.sav.market.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import java.util.Date;

public class Checkout extends AbsEntity {

    @Column(unique = true)
    private String code;

    @Column(nullable = false)
    private Date checkoutDate;

    @ManyToOne(optional = false)
    private Magazine magazine;



}
