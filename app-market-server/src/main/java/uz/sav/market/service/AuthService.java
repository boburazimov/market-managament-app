package uz.sav.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.entity.enums.RoleNameEnum;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ReqRegister;
import uz.sav.market.repository.UserRepository;
import uz.sav.market.repository.rest.RoleRepository;

import java.util.Collections;
import java.util.UUID;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;


    public ApiResponse register(ReqRegister request) {
        if (request.getPassword().equals(request.getPrePassword())) {
            boolean exists = userRepository.existsByPhoneNumber(request.getPhoneNumber());
            if (!exists) {

                User user = new User(
                        request.getExternalCode(),
                        request.getFirstName(),
                        request.getLastName(),
                        request.getPhoneNumber(),
                        request.getEmail(),
                        passwordEncoder.encode(request.getPassword()),
                        request.getStatusEnum(),
                        Collections.singletonList(roleRepository.findByName(RoleNameEnum.ROLE_USER))
                );
                userRepository.save(user);
                return new ApiResponse("Ro'yxatdan o'tdi", true);
            }
            return new ApiResponse("Bunday tel raqamli user mavjud", false);
        }
        return new ApiResponse("Parol va takroriy parol mutanosib emas", false);
    }

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("phoneNumber"));
    }

    public User loadUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Id"));
    }

}
