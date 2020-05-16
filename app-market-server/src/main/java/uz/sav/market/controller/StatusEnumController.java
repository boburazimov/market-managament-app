package uz.sav.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.service.StatusEnumService;

@RestController
@RequestMapping("/api/status")
public class StatusEnumController {

    @Autowired
    StatusEnumService statusEnumService;

    @GetMapping
    public HttpEntity<?> getStatusEnums() {
        return ResponseEntity.ok(
                new ApiResponse(
                        "Статусы загружены!",
                        true,
                        statusEnumService.getStatusEnums()));
    }
}
