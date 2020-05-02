package uz.sav.market.entity.catalogs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.sav.market.entity.template.AbsEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class MBalance extends AbsEntity {

    @OneToMany(mappedBy = "balance")
    private List<Magazine> magazines;

    @Column(nullable = false, length = 8)
    private Double balance;

    private String extraInfo;
}
