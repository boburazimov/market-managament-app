package uz.sav.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.service.PayMethodEnumService;

@RestController
@RequestMapping("/api/methodEnum")
public class PayMethodEnumController {

    @Autowired
    PayMethodEnumService payMethodEnumService;

    @GetMapping
    public HttpEntity<?> getMethodEnums() {
        return ResponseEntity.ok(
                new ApiResponse(
                        "Методы загружены",
                        true,
                        payMethodEnumService.getPayMethods()));
    }
}
