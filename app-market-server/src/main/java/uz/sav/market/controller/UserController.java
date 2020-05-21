package uz.sav.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.repository.UserRepository;
import uz.sav.market.security.CurrentUser;
import uz.sav.market.service.UserService;

import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;

    @GetMapping("/userMe")
    public HttpEntity<?> userMe(@CurrentUser User user) {
        return ResponseEntity.ok(new ApiResponse(true, user));
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getUser(@PathVariable UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        return ResponseEntity.ok(userService.getUser(user));
    }

    @GetMapping("/list")
    public HttpEntity<?> getUserList() {
        return ResponseEntity.ok(new ApiResponse("Get User List", true, userService.getUserList()));
    }
}
