package uz.sav.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uz.sav.market.entity.catalogs.MBalance;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.exception.BadRequestException;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqMBalance;
import uz.sav.market.repository.MBalanceRepository;
import uz.sav.market.security.CurrentUser;
import uz.sav.market.service.MBalanceService;
import uz.sav.market.utils.AppConstants;

import java.util.UUID;

@Controller
@RequestMapping(path = "/api/mbalance")
public class MBalanceController {

    @Autowired
    MBalanceRepository balanceRepository;
    @Autowired
    MBalanceService balanceService;

    @PostMapping
    public HttpEntity<?> addMbalance(@RequestBody ReqMBalance reqMBalance, @CurrentUser User user) {
        ApiResponse apiResponse = balanceService.addMBalance(reqMBalance, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getMbalance(@PathVariable UUID id) {
        MBalance balance = balanceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getMbalance"));
        return ResponseEntity.ok(balanceService.getMBalance(balance));
    }

    @GetMapping
    public HttpEntity<?> getMbalances(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE) int page,
                                      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_SIZE) int size) throws BadRequestException {
        return ResponseEntity.ok(balanceService.getMBalances(page, size));
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteMbalance(@PathVariable UUID id) {
        ApiResponse apiResponse = balanceService.deleteMBalance(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.ACCEPTED : HttpStatus.CONFLICT).body(apiResponse);
    }
}
