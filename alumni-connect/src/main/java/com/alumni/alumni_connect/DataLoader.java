package com.alumni.alumni_connect;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(UserRepository repository, BCryptPasswordEncoder encoder) {
        return args -> {

            // 🔥 avoid duplicate inserts
            if (repository.count() > 0) {
                return;
            }

            // 🔥 Admin
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(encoder.encode("admin")); // ✅ FIXED
            admin.setRole("ADMIN");
            admin.setStatus("APPROVED");
            repository.save(admin);

            // 🔥 Student
            User student = new User();
            student.setName("Rahul");
            student.setEmail("rahul@gmail.com");
            student.setPassword(encoder.encode("123")); // ✅ FIXED
            student.setRole("STUDENT");
            student.setStatus("APPROVED");
            student.setPassoutYear("2024");
            student.setCollege("XYZ College");
            student.setRollno("101");
            student.setSection("A");
            repository.save(student);

            // 🔥 Alumni
            User alumni = new User();
            alumni.setName("Anita");
            alumni.setEmail("anita@gmail.com");
            alumni.setPassword(encoder.encode("123")); // ✅ FIXED
            alumni.setRole("ALUMNI");
            alumni.setStatus("APPROVED");
            alumni.setPassoutYear("2020");
            alumni.setRollno("55");
            repository.save(alumni);

            System.out.println("🔥 Sample users created with encrypted passwords");
        };
    }
}