package uz.sav.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.sav.market.entity.catalogs.CashDesk;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.entity.enums.StatusEnum;
import uz.sav.market.exception.BadRequestException;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqCashDesk;
import uz.sav.market.payload.ResCashDesk;
import uz.sav.market.payload.ResPageable;
import uz.sav.market.repository.CashDeskRepository;
import uz.sav.market.repository.MagazineRepository;
import uz.sav.market.repository.rest.MBalanceRepository;
import uz.sav.market.utils.CommonUtils;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CashDeskServiceImpl implements CashDeskService {

    @Autowired
    CashDeskRepository cashDeskRepository;
    @Autowired
    MBalanceRepository balanceRepository;
    @Autowired
    MagazineRepository magazineRepository;

    @Override
    public ApiResponse addCashDesk(ReqCashDesk request, User user) {

        try {
            CashDesk cashDesk = new CashDesk();
            if (request.getId() != null)
                cashDesk = cashDeskRepository.findById(request.getId()).orElseThrow(() -> new ResourceNotFoundException("getCashDesk"));
            cashDesk.setExternalCode(request.getExternalCode());
            cashDesk.setMagazine(magazineRepository.findById(request.getMagazineId()).orElseThrow(() -> new ResourceNotFoundException("getCashDesk")));
            cashDesk.setBalance(balanceRepository.findById(request.getMBalanceId()).orElseThrow(() -> new ResourceNotFoundException("getCashDesk")));
            cashDesk.setName(request.getName());
            cashDesk.setExtraInfo(request.getExtraInfo());
            cashDesk.setStatusEnum(request.getStatusEnum());
            cashDeskRepository.save(cashDesk);
            return new ApiResponse(request.getId() == null ? "Касса ККМ добавлен!" : "Касса ККМ изменен!", true);
        } catch (Exception e) {
            return new ApiResponse(e.getMessage(), false);
        }
    }

    @Override
    public ResCashDesk getCashDesk(CashDesk cashDesk) {

        assert cashDesk.getMagazine() != null;
        return new ResCashDesk(
                cashDesk.getId(),
                cashDesk.getExternalCode(),
                cashDesk.getName(),
                cashDesk.getMagazine() == null ? null : cashDesk.getMagazine().getId(),
                cashDesk.getMagazine().getName(),
                cashDesk.getBalance().getId(),
                cashDesk.getBalance().getBalanceValue(),
                cashDesk.getExtraInfo(),
                cashDesk.getStatusEnum()
        );
    }

    @Override
    public ResPageable getCashDesks(int page, int size) throws BadRequestException {

        CommonUtils.getPageable(page, size);
        PageRequest pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<CashDesk> cashDeskPage = cashDeskRepository.findAll(pageable);
        return new ResPageable(
                cashDeskPage.getTotalPages(),
                cashDeskPage.getTotalElements(),
                page,
                cashDeskPage.getContent().stream().map(this::getCashDesk).collect(Collectors.toList()));
    }

    @Override
    public ApiResponse deleteCashDesk(UUID id) {

        try {
            CashDesk cashDesk = cashDeskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getCashDesk"));
            cashDeskRepository.deleteById(cashDesk.getId());
            return new ApiResponse("Касса ККМ удален!", true);
        } catch (Exception e) {
            return new ApiResponse(e.getMessage(), false);
        }
    }

    @Override
    public List<ResCashDesk> getCashDesksByMagazine(UUID magazineId) {
        List<CashDesk> byMagazineAndAndStatusEnum = cashDeskRepository.findAllByMagazineIdAndAndStatusEnum(magazineId, StatusEnum.ACTIVE);
        return byMagazineAndAndStatusEnum.stream().map(this::getCashDesk).collect(Collectors.toList());

    }
}
