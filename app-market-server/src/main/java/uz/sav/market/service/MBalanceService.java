package uz.sav.market.service;

import uz.sav.market.entity.catalogs.MBalance;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqMBalance;
import uz.sav.market.payload.ResMBalance;
import uz.sav.market.payload.ResPageable;

import java.util.UUID;

public interface MBalanceService {

    ApiResponse addMBalance(ReqMBalance reqMBalance, User user);

    ResMBalance getMBalance(MBalance balance);

    ResPageable getMBalances(int page, int size);

    ApiResponse deleteMBalance(UUID id);
}
