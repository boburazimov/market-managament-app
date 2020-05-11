package uz.sav.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.exception.BadRequestException;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ResPageable;
import uz.sav.market.payload.ResUser;
import uz.sav.market.repository.UserRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;

    @Override
    public ResUser getUser(User user) {

        return new ResUser(
                user.getId(),
                user.getExternalCode(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getStatusEnum(),
                user.getRoles()
        );
    }

    @Override
    public ResPageable getUsers(int page, int size) throws BadRequestException {
        return null;
    }

    @Override
    public ApiResponse deleteUser(UUID id) {
        return null;
    }

    @Override
    public List<ResUser> getUserList() {
        return userRepository.findAll().stream().map(
                user -> new ResUser(
                        user.getId(),
                        user.getPhoneNumber()
                )).collect(Collectors.toList());
    }
}
