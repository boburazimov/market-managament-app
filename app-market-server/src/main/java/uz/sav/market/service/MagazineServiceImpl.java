package uz.sav.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.sav.market.entity.catalogs.Magazine;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqMagazine;
import uz.sav.market.payload.ResMagazine;
import uz.sav.market.payload.ResPageable;
import uz.sav.market.repository.MBalanceRepository;
import uz.sav.market.repository.MagazineRepository;
import uz.sav.market.repository.UserRepository;

import java.util.UUID;

@Service
public class MagazineServiceImpl implements MagazineService {

    @Autowired
    MagazineRepository magazineRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MBalanceRepository balanceRepository;

    @Override
    public ApiResponse addMagazine(ReqMagazine request, User user) {
        try {
            Magazine magazine = new Magazine();
            if (request.getId() != null)
                magazine = magazineRepository.findById(request.getId()).orElseThrow(() -> new ResourceNotFoundException("getMagazine"));
            magazine.setName(request.getName());
            magazine.setSoftCode(request.getSoftCode());
            magazine.setUser(userRepository.findById(request.getUserId()).orElseThrow(() -> new ResourceNotFoundException("getUser")));
            magazine.setBalance(balanceRepository.findById(request.getBalanceId()).orElseThrow(() -> new ResourceNotFoundException("getMBalance")));
            magazine.setExtraInfo(request.getExtraInfo());
            magazineRepository.save(magazine);
            return new ApiResponse(request.getId() == null ? "Magazine saved!" : "Magazine edited!", true);
        } catch (Exception e) {
            return new ApiResponse(e.getMessage(), false);
        }
    }

    @Override
    public ResMagazine getMagazine(Magazine magazine) {
        return null;
    }

    @Override
    public ResPageable getMagazines(int page, int size) {
        return null;
    }

    @Override
    public ApiResponse deleteMagazine(UUID id) {
        return null;
    }
}
