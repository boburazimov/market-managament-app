package uz.sav.market.entity.catalogs;

import uz.sav.market.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.ManyToOne;

public class Magazine extends AbsEntity {

    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private Long SoftCode;

    @Column(nullable = false, length = 30, name = "ResponsRerson")
    private User User;

    @ManyToOne(optional = false)
    private MBalance balance;
}
