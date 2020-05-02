package uz.sav.market.entity.catalogs;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class PayType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;
}
