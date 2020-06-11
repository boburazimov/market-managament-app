package uz.sav.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqRegister;
import uz.sav.market.security.JwtTokenProvider;
import uz.sav.market.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public HttpEntity<?> register(@RequestBody ReqRegister reqRegister) {
        ApiResponse response = authService.register(reqRegister);
        return ResponseEntity.status(response.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(response);
    }

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody ReqRegister reqRegister) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(reqRegister.getPhoneNumber(), reqRegister.getPassword()));
        String token = jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(token);
    }

}
