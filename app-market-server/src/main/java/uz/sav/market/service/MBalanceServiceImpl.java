package uz.sav.market.service;

import org.springframework.stereotype.Service;
import uz.sav.market.entity.catalogs.MBalance;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqMBalance;
import uz.sav.market.payload.ResMBalance;
import uz.sav.market.payload.ResPageable;

import java.util.UUID;

@Service
public class MBalanceServiceImpl implements MBalanceService {

    @Override
    public ApiResponse addMBalance(ReqMBalance reqMBalance, User user) {
        return null;
    }

    @Override
    public ResMBalance getMBalance(MBalance balance) {
        return null;
    }

    @Override
    public ResPageable getMBalances(int page, int size) {
        return null;
    }

    @Override
    public ApiResponse deleteMBalance(UUID id) {
        return null;
    }
}
