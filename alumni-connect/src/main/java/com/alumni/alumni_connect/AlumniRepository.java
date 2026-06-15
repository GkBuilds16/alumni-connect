package com.alumni.alumni_connect;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlumniRepository extends JpaRepository<User, Long> {

    // 🔥 Get only approved users
    List<User> findByStatus(String status);
}