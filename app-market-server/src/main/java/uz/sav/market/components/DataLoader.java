package uz.sav.market.components;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import uz.sav.market.entity.catalogs.User;
import uz.sav.market.entity.enums.StatusEnum;
import uz.sav.market.repository.UserRepository;
import uz.sav.market.repository.rest.RoleRepository;

@Component
public class DataLoader implements CommandLineRunner {
    final
    UserRepository userRepository;
    final
    RoleRepository roleRepository;
    final
    PasswordEncoder passwordEncoder;

    @Value("${spring.datasource.initialization-mode}")
    private String initMode;

    public DataLoader(UserRepository userRepository, RoleRepository roleRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (initMode.equals("always")) {
            userRepository.save(new User(
                    "AA-00001",
                    "Bobur",
                    "Azimov",
                    "+998974445403",
                    "b.azimov@havasfood.uz",
                    passwordEncoder.encode("123"),
                    StatusEnum.ACTIVE,
                    roleRepository.findAll()
            ));
        }
    }
}