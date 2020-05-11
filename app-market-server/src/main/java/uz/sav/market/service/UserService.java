package uz.sav.market.service;

import uz.sav.market.entity.catalogs.User;
import uz.sav.market.exception.BadRequestException;
import uz.sav.market.payload.ApiResponse;
import uz.sav.market.payload.ResPageable;
import uz.sav.market.payload.ResUser;

import java.util.List;
import java.util.UUID;

public interface UserService {

    ResUser getUser(User user);

    ResPageable getUsers(int page, int size) throws BadRequestException;

    ApiResponse deleteUser(UUID id);

    List<ResUser> getUserList();
}
