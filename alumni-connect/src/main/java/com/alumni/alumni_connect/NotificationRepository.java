package com.alumni.alumni_connect;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    // =====================================
    // GET USER NOTIFICATIONS
    // =====================================

    List<Notification> findByEmailOrderByTimestampDesc(

            String email
    );

    // =====================================
    // COUNT UNREAD
    // =====================================

    long countByEmailAndIsReadFalse(

            String email
    );
}