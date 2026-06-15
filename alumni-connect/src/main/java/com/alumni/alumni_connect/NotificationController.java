package com.alumni.alumni_connect;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(
        origins = "http://localhost:4200"
)

public class NotificationController {

    private final NotificationRepository repository;

    public NotificationController(

            NotificationRepository repository

    ) {

        this.repository = repository;
    }

    // =====================================
    // GET ALL NOTIFICATIONS
    // =====================================

    @GetMapping(
            "/notifications/{email}"
    )

    public List<Notification> getNotifications(

            @PathVariable String email

    ) {

        return repository
                .findByEmailOrderByTimestampDesc(
                        email
                );
    }

    // =====================================
    // UNREAD COUNT
    // =====================================

    @GetMapping(
            "/notifications/unread/{email}"
    )

    public long getUnreadCount(

            @PathVariable String email

    ) {

        return repository
                .countByEmailAndIsReadFalse(
                        email
                );
    }

    // =====================================
    // MARK READ
    // =====================================

    @PutMapping(
            "/notifications/read/{id}"
    )

    public Notification markRead(

            @PathVariable Long id

    ) {

        Notification notification =
                repository.findById(id)

                        .orElseThrow();

        notification.setRead(true);

        return repository.save(
                notification
        );
    }
}