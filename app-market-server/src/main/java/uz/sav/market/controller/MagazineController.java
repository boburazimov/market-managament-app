package uz.sav.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uz.sav.market.entity.catalogs.Magazine;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.exception.BadRequestException;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqMagazine;
import uz.sav.market.repository.MagazineRepository;
import uz.sav.market.security.CurrentUser;
import uz.sav.market.service.MagazineService;
import uz.sav.market.utils.AppConstants;

import java.util.Optional;
import java.util.UUID;

@Controller
@RequestMapping(path = "/api/magazine")
public class MagazineController {

    @Autowired
    MagazineService magazineService;
    @Autowired
    MagazineRepository magazineRepository;

    @PostMapping
    public HttpEntity<?> addMagazine(@RequestBody ReqMagazine reqMagazine, @CurrentUser User user) {
        ApiResponse apiResponse = magazineService.addMagazine(reqMagazine, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getMagazine(@PathVariable UUID id) {
        Magazine magazine = magazineRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getMagazine"));
        return ResponseEntity.ok(magazineService.getMagazine(magazine));
    }

    @GetMapping
    public HttpEntity<?> getMagazines(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE) int page,
                                      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_SIZE) int size) throws BadRequestException {
        return ResponseEntity.ok(magazineService.getMagazines(page, size));
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteMagazine(@PathVariable UUID id) {
        ApiResponse apiResponse = magazineService.deleteMagazine(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.ACCEPTED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("/byUser")
    public HttpEntity<?> getMagazineBy(@RequestParam(value = "id", defaultValue = "") String id) {
        Magazine magazine = new Magazine();
        if (!id.isEmpty())
            magazine = magazineRepository.findByUserId(UUID.fromString(id)).orElseGet(Magazine::new);
        return ResponseEntity.ok(new ApiResponse("Получен магазин по пользователю", true, magazineService.getMagazine(magazine)));
    }
}
