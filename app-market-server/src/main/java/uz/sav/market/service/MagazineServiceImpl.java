package uz.sav.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.sav.market.entity.catalogs.Magazine;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.exception.BadRequestException;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqMagazine;
import uz.sav.market.payload.ResMagazine;
import uz.sav.market.payload.ResPageable;
import uz.sav.market.repository.MagazineRepository;
import uz.sav.market.repository.UserRepository;
import uz.sav.market.utils.CommonUtils;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MagazineServiceImpl implements MagazineService {

    @Autowired
    MagazineRepository magazineRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public ApiResponse addMagazine(ReqMagazine request, User user) {

        try {
            Magazine magazine = new Magazine();
            if (request.getId() != null)
                magazine = magazineRepository.findById(request.getId()).orElseThrow(() -> new ResourceNotFoundException("getMagazine"));
            magazine.setExternalCode(request.getExternalCode());
            magazine.setName(request.getName());
            magazine.setUser(userRepository.findById(request.getUserId()).orElseThrow(() -> new ResourceNotFoundException("getUser")));
            magazine.setExtraInfo(request.getExtraInfo());
            magazineRepository.save(magazine);
            return new ApiResponse(request.getId() == null ? "Магазин добавлен!" : "Магазин изменен!", true);
        } catch (Exception e) {
            return new ApiResponse(e.getMessage(), false);
        }
    }

    @Override
    public ResMagazine getMagazine(Magazine magazine) {

        return new ResMagazine(
                magazine.getId(),
                magazine.getExternalCode(),
                magazine.getName(),
                magazine.getUser().getId(),
                magazine.getUser().getPhoneNumber(),
                magazine.getExtraInfo()
        );
    }

    @Override
    public ResPageable getMagazines(int page, int size) throws BadRequestException {

        CommonUtils.getPageable(page, size);
        PageRequest pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Magazine> magazinePage = magazineRepository.findAll(pageable);
        return new ResPageable(
                magazinePage.getTotalPages(),
                magazinePage.getTotalElements(),
                page,
                magazinePage.getContent().stream().map(this::getMagazine).collect(Collectors.toList()));
    }

    @Override
    public ApiResponse deleteMagazine(UUID id) {

        try {
            Magazine magazine = magazineRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getMagazine"));
            magazineRepository.deleteById(magazine.getId());
            return new ApiResponse("Магазин удален!", true);
        } catch (Exception e) {
            return new ApiResponse(e.getMessage(), false);
        }
    }
}
