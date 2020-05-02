package uz.sav.market.entity.catalogs;

import uz.sav.market.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

public class MBalance extends AbsEntity {

    @OneToMany(mappedBy = "mbalance")
    private Magazine magazine;

    @Column(nullable = false, length = 8)
    private Double balance;

}
