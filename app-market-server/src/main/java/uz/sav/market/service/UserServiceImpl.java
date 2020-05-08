package uz.sav.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.exception.BadRequestException;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ResPageable;
import uz.sav.market.payload.ResUser;

import java.util.UUID;
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired


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
}
