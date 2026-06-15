package com.alumni.alumni_connect;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    // =========================================
    // FIND BY EMAIL
    // =========================================

    Optional<User> findByEmail(

            String email
    );

    // =========================================
    // FIND BY EMAIL + ROLE
    // =========================================

    Optional<User> findByEmailAndRole(

            String email,

            String role
    );

    // =========================================
    // FIND BY ROLE
    // =========================================

    List<User> findByRole(

            String role
    );

    // =========================================
    // FIND BY STATUS
    // =========================================

    List<User> findByStatus(

            String status
    );

    // =========================================
    // FIND BY ROLE + STATUS
    // =========================================

    List<User> findByRoleAndStatus(

            String role,

            String status
    );
}