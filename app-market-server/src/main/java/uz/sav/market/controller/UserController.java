package uz.sav.market.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.security.CurrentUser;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/userMe")
    public HttpEntity<?> userMe(@CurrentUser User user) {
        return ResponseEntity.ok(user);
    }
}
