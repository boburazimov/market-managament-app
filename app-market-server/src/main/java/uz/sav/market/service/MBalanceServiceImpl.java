package uz.sav.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.sav.market.entity.catalogs.MBalance;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.exception.BadRequestException;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqMBalance;
import uz.sav.market.payload.ResMBalance;
import uz.sav.market.payload.ResPageable;
import uz.sav.market.repository.MBalanceRepository;
import uz.sav.market.utils.CommonUtils;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MBalanceServiceImpl implements MBalanceService {

    @Autowired
    MBalanceRepository balanceRepository;

    @Override
    public ApiResponse addMBalance(ReqMBalance request, User user) {

        try {
            MBalance balance = new MBalance();
            if (request.getId() != null)
                balance = balanceRepository.findById(request.getId()).orElseThrow(() -> new ResourceNotFoundException("getMBalance"));
            balance.setBalance(request.getBalance());
            balance.setExtraInfo(request.getExtraInfo());
            balanceRepository.save(balance);
            return new ApiResponse(request.getId() == null ? "Balance saved!" : "Balance Edited!", true);
        } catch (Exception e) {
            return new ApiResponse(e.getMessage(), false);
        }
    }

    @Override
    public ResMBalance getMBalance(MBalance balance) {

        return new ResMBalance(
                balance.getId(),
                balance.getBalance(),
                balance.getExtraInfo()
        );
    }

    @Override
    public ResPageable getMBalances(int page, int size) throws BadRequestException {

        CommonUtils.getPageable(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<MBalance> balancePage = balanceRepository.findAll(pageable);
        return new ResPageable(balancePage.getTotalPages(),
                balancePage.getTotalElements(),
                page,
                balancePage.getContent().stream().map(this::getMBalance).collect(Collectors.toList()));
    }

    @Override
    public ApiResponse deleteMBalance(UUID id) {

        try {
            MBalance balance = balanceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getMBalance"));
            balanceRepository.deleteById(balance.getId());
            return new ApiResponse("Balance Deleted!", true);
        } catch (Exception e) {
            return new ApiResponse(e.getMessage(), false);
        }
    }
}
