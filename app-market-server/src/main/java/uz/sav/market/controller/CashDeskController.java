package uz.sav.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uz.sav.market.entity.catalogs.CashDesk;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.exception.BadRequestException;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqCashDesk;
import uz.sav.market.repository.CashDeskRepository;
import uz.sav.market.security.CurrentUser;
import uz.sav.market.service.CashDeskService;
import uz.sav.market.utils.AppConstants;

import java.util.UUID;

@Controller
@RequestMapping(path = "/api/cashDesk")
public class CashDeskController {

    @Autowired
    CashDeskService cashDeskService;
    @Autowired
    CashDeskRepository cashDeskRepository;

    @PostMapping
    public HttpEntity<?> addCashDesk(@RequestBody ReqCashDesk cashDesk, @CurrentUser User user) {
        ApiResponse apiResponse = cashDeskService.addCashDesk(cashDesk, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getCashDesk(@PathVariable UUID id) {
        CashDesk cashDesk = cashDeskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getCashDesk"));
        return ResponseEntity.ok(cashDeskService.getCashDesk(cashDesk));
    }

    @GetMapping
    public HttpEntity<?> getCashDesks(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE) int page,
                                      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_SIZE) int size) throws BadRequestException {
        return ResponseEntity.ok(cashDeskService.getCashDesks(page, size));
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteCashDesk(@PathVariable UUID id) {
        ApiResponse apiResponse = cashDeskService.deleteCashDesk(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.ACCEPTED : HttpStatus.CONFLICT).body(apiResponse);
    }
}
