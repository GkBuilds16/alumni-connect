package com.alumni.alumni_connect;

import org.springframework.web.bind.annotation.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@RestController

@CrossOrigin(origins = "http://localhost:4200")

public class AuthController {

    private final UserRepository repository;

    private final BCryptPasswordEncoder encoder;

    public AuthController(

            UserRepository repository,

            BCryptPasswordEncoder encoder

    ) {

        this.repository = repository;

        this.encoder = encoder;
    }

    // 🔹 SIGNUP

    @PostMapping("/signup")

    public String signup(
            @RequestBody User user
    ) {

        Optional<User> existing =

                repository.findByEmail(
                        user.getEmail()
                );

        // ❌ EMAIL EXISTS

        if (existing.isPresent()) {

            return "Email already exists";
        }

        // 🔐 ENCRYPT PASSWORD

        user.setPassword(

                encoder.encode(
                        user.getPassword()
                )
        );

        // ⏳ WAIT FOR APPROVAL

        user.setStatus("PENDING");

        repository.save(user);

        return "Signup successful";
    }

    // 🔹 LOGIN

    @PostMapping("/login")

    public Object login(
            @RequestBody User user
    ) {

        Optional<User> optionalUser =

                repository.findByEmailAndRole(

                        user.getEmail(),

                        user.getRole()
                );

        // ❌ USER NOT FOUND

        if (optionalUser.isEmpty()) {

            return "User not found for selected role";
        }

        User existing = optionalUser.get();

        // ❌ WRONG PASSWORD

        if (!encoder.matches(

                user.getPassword(),

                existing.getPassword()

        )) {

            return "Invalid password";
        }

        // ⏳ WAIT APPROVAL

        if ("PENDING".equals(
                existing.getStatus()
        )) {

            return "WAIT_APPROVAL";
        }

        // ✅ GENERATE JWT

        return JwtUtil.generateToken(

                existing.getEmail(),

                existing.getRole()
        );
    }

    // 🔹 APPROVE USER

    @PutMapping("/approve/{id}")

    public User approveUser(

            @PathVariable Long id

    ) {

        User user = repository

                .findById(id)

                .orElseThrow();

        user.setStatus("APPROVED");

        return repository.save(user);
    }
}