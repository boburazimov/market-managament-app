package uz.sav.market.entity.registers;

import uz.sav.market.entity.catalogs.MBalance;
import uz.sav.market.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.ManyToOne;

public class Input extends AbsEntity {

    @ManyToOne(optional = false)
    private MBalance balance;

    @Column(length = 12, nullable = false)
    private Double totalUzs;

    @Column(length = 12, nullable = false)
    private Double ClearDateUzs;


}
