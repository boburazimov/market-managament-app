package uz.sav.market.entity.catalogs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.sav.market.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CashDesk extends AbsEntity {

    @Column(unique = true, nullable = false)
    private String externalCode;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne(optional = false)
    private Magazine magazine;

    @ManyToOne(optional = false)
    private MBalance balance;

    private String extraInfo;
}
