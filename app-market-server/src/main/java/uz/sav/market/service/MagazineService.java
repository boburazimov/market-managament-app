package uz.sav.market.service;

import uz.sav.market.entity.catalogs.Magazine;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqMagazine;
import uz.sav.market.payload.ResMagazine;
import uz.sav.market.payload.ResPageable;

import java.util.UUID;

public interface MagazineService {

    ApiResponse addMagazine(ReqMagazine magazine, User user);

    ResMagazine getMagazine(Magazine magazine);

    ResPageable getMagazines(int page, int size);

    ApiResponse deleteMagazine(UUID id);
}
