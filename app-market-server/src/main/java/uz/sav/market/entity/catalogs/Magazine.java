package uz.sav.market.entity.catalogs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.sav.market.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Magazine extends AbsEntity {

    @Column(unique = true, nullable = false)
    private String externalCode;

    @Column(unique = true, nullable = false)
    private String name;

    @ManyToOne(optional = false)
    private User user;

    private String extraInfo;
}
