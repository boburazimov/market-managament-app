package uz.sav.market.service;

import uz.sav.market.entity.catalogs.CashDesk;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.exception.BadRequestException;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqCashDesk;
import uz.sav.market.payload.ResCashDesk;
import uz.sav.market.payload.ResPageable;

import java.util.UUID;

public interface CashDeskService {

    ApiResponse addCashDesk(ReqCashDesk request, User user);

    ResCashDesk getCashDesk(CashDesk cashDesk);

    ResPageable getCashDesks(int page, int size) throws BadRequestException;

    ApiResponse deleteCashDesk(UUID id);
}
